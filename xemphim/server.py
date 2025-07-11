import flask
import pyodbc
from flask_cors import CORS
from flask import request, jsonify
from datetime import datetime

app = flask.Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

def get_db_connection():
    conn_str = (
        "Driver={SQL Server};"
        "Server=LEVANHOANG\SQLEXPRESS;"
        "Database=Ve_Xem_Phim;"
        "Trusted_Connection=yes;"
    )
    try:
        return pyodbc.connect(conn_str)
    except pyodbc.Error as e:
        print(f"Lỗi kết nối cơ sở dữ liệu: {str(e)}")
        raise

# -------------------- HÀM DÙNG CHUNG: LẤY DỮ LIỆU --------------------
def fetch_all(table_name):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        sql = f"SELECT * FROM {table_name}"
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        cursor.close()
        conn.close()
        return rows
    except pyodbc.Error as e:
        print(f"Lỗi khi lấy dữ liệu: {str(e)}")
        return []

def fetch_one(sql):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(sql)
        row = cursor.fetchone()
        if row:
            columns = [col[0] for col in cursor.description]
            result = dict(zip(columns, row))
        else:
            result = None
        cursor.close()
        conn.close()
        return result
    except Exception as e:
        print(f"Lỗi khi lấy một dòng dữ liệu: {str(e)}")
        return None

# Đăng ký người dùng
@app.route('/api/dangky', methods=['POST'])
def dang_ky():
    data = flask.request.get_json()
    ho_ten = data.get('hoTen')
    email = data.get('email')
    sdt = data.get('sdt')
    mat_khau = data.get('matKhau')
    ten_dang_nhap = email

    if not all([ho_ten, email, sdt, mat_khau]):
        return flask.jsonify({'success': False, 'message': 'Vui lòng nhập đầy đủ thông tin'}), 400
    if '@' not in email or '.' not in email:
        return flask.jsonify({'success': False, 'message': 'Email không hợp lệ'}), 400
    if len(mat_khau) < 6:
        return flask.jsonify({'success': False, 'message': 'Mật khẩu phải có ít nhất 6 ký tự'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM nguoi_dung WHERE email = ? OR ten_dang_nhap = ?", (email, ten_dang_nhap))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return flask.jsonify({'success': False, 'message': 'Email hoặc tên đăng nhập đã được sử dụng'}), 400

        cursor.execute("""
            INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, ho_ten, email, so_dien_thoai, la_quan_tri)
            OUTPUT INSERTED.nguoidung_id, INSERTED.ten_dang_nhap, INSERTED.ho_ten, INSERTED.la_quan_tri
            VALUES (?, ?, ?, ?, ?, ?)
        """, (ten_dang_nhap, mat_khau, ho_ten, email, sdt, 0))

        user = cursor.fetchone()
        conn.commit()

        response = {
            'success': True,
            'message': 'Đăng ký thành công',
            'user': {
                'id': user.nguoidung_id,
                'ten_dang_nhap': user.ten_dang_nhap,
                'ho_ten': user.ho_ten,
                'la_quan_tri': user.la_quan_tri
            }
        }

        cursor.close()
        conn.close()
        return flask.jsonify(response), 201

    except Exception as e:
        return flask.jsonify({'success': False, 'message': f'Lỗi: {str(e)}'}), 500

# Đăng nhập người dùng
@app.route('/api/dangnhap', methods=['POST'])
def dang_nhap():
    data = flask.request.get_json()
    ten_dang_nhap = data.get('tenDangNhap')
    mat_khau = data.get('matKhau')

    if not ten_dang_nhap or not mat_khau:
        return flask.jsonify({'success': False, 'message': 'Vui lòng nhập đầy đủ thông tin'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT nguoidung_id, ten_dang_nhap, mat_khau, ho_ten, la_quan_tri
            FROM nguoi_dung 
            WHERE ten_dang_nhap = ? OR email = ?
        """, (ten_dang_nhap, ten_dang_nhap))

        user = cursor.fetchone()
        if not user:
            return flask.jsonify({'success': False, 'message': 'Tài khoản không tồn tại'}), 401
        if user.mat_khau != mat_khau:
            return flask.jsonify({'success': False, 'message': 'Mật khẩu không đúng'}), 401

        response = {
            'success': True,
            'message': 'Đăng nhập thành công',
            'la_quan_tri': bool(user.la_quan_tri),
            'user': {
                'id': user.nguoidung_id,
                'ten_dang_nhap': user.ten_dang_nhap,
                'ho_ten': user.ho_ten
            }
        }

        cursor.close()
        conn.close()
        return flask.jsonify(response), 200

    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500

# CRUD người dùng
@app.route('/api/nguoidung', methods=['GET'])
def get_all_nguoi_dung():
    return flask.jsonify(fetch_all('nguoi_dung'))

@app.route('/api/nguoidung', methods=['POST'])
def them_nguoi_dung():
    data = flask.request.get_json()
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, ho_ten, email, so_dien_thoai, la_quan_tri)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            data['ten_dang_nhap'],
            data['mat_khau'],
            data.get('ho_ten'),
            data.get('email'),
            data.get('so_dien_thoai'),
            int(data.get('la_quan_tri', False))
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Thêm người dùng thành công'}), 201
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/nguoidung/<int:nguoidung_id>', methods=['PUT'])
def sua_nguoi_dung(nguoidung_id):
    data = flask.request.get_json()
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE nguoi_dung
            SET ten_dang_nhap = ?, mat_khau = ?, ho_ten = ?, email = ?, so_dien_thoai = ?, la_quan_tri = ?
            WHERE nguoidung_id = ?
        """, (
            data['ten_dang_nhap'],
            data['mat_khau'],
            data.get('ho_ten'),
            data.get('email'),
            data.get('so_dien_thoai'),
            int(data.get('la_quan_tri', False)),
            nguoidung_id
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Cập nhật người dùng thành công'}), 200
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/nguoidung/<int:nguoidung_id>', methods=['DELETE'])
def xoa_nguoi_dung(nguoidung_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM nguoi_dung WHERE nguoidung_id = ?", (nguoidung_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Xóa người dùng thành công'}), 200
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500

# Danh sách phim
@app.route('/api/phim', methods=['GET'])
def get_all_phim():
    phim_data = fetch_all('phim')
    for phim in phim_data:
        # Bổ sung trường cho frontend, không xóa trường gốc
        phim['id'] = phim['phim_id']
        phim['ten'] = phim['ten_phim']
        phim['moTa'] = phim['mo_ta']
        phim['thoiLuong'] = phim['thoi_luong']
        phim['tacGia'] = phim['tac_gia']
        phim['trailer'] = phim['trailer']
    return flask.jsonify(phim_data)

@app.route('/api/phongchieu', methods=['GET'])
def get_all_phong_chieu():
    return flask.jsonify(fetch_all('phong_chieu'))

@app.route('/api/ghe', methods=['GET'])
def get_all_ghe():
    return flask.jsonify(fetch_all('ghe'))

@app.route('/api/suatchieu', methods=['GET'])
def get_all_suat_chieu():
    return flask.jsonify(fetch_all('suat_chieu'))

@app.route('/api/vedat', methods=['GET'])
def get_all_ve_dat():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM ve_dat")
    ve_list = [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]
    for ve in ve_list:
        cursor.execute("""
            SELECT ctv.ghe_id, g.so_ghe, ctv.gia_ve
            FROM chi_tiet_ve_dat ctv
            JOIN ghe g ON ctv.ghe_id = g.ghe_id
            WHERE ctv.ve_dat_id = ?
        """, (ve['ve_id'],))
        ve['chi_tiet'] = [
            {
                'ghe_id': row[0],
                'so_ghe': row[1],
                'gia_ve': float(row[2])
            }
            for row in cursor.fetchall()
        ]
        cursor.execute("""
            SELECT TOP 1 trang_thai
            FROM thanh_toan
            WHERE ve_id = ?
            ORDER BY thanh_toan_id DESC
        """, (ve['ve_id'],))
        row = cursor.fetchone()
        ve['trang_thai_thanh_toan'] = row[0] if row else None
    cursor.close()
    conn.close()
    return flask.jsonify(ve_list)

@app.route('/api/thanhtoan', methods=['GET'])
def get_all_thanh_toan():
    return flask.jsonify(fetch_all('thanh_toan'))

# Thêm phim
@app.route('/api/phim', methods=['POST'])
def them_phim():
    data = flask.request.get_json()
    ten_phim = data.get('ten')
    tac_gia = data.get('tacGia')
    mo_ta = data.get('moTa')
    thoi_luong = data.get('thoiLuong')
    anh = data.get('anh')
    trailer = data.get('trailer')

    if not ten_phim:
        return flask.jsonify({'success': False, 'message': 'Tên phim không được để trống'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO phim (ten_phim, mo_ta, thoi_luong, tac_gia, anh, trailer)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (ten_phim, mo_ta, thoi_luong, tac_gia, anh, trailer))
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Thêm phim thành công'}), 201
    except Exception as e:
        print("Lỗi thêm phim:", e)
        return flask.jsonify({'success': False, 'message': str(e)}), 500

# Sửa phim
@app.route('/api/phim/<int:phim_id>', methods=['PUT'])
def sua_phim(phim_id):
    data = flask.request.get_json()
    ten_phim = data.get('ten')
    mo_ta = data.get('moTa')
    thoi_luong = data.get('thoiLuong')
    tac_gia = data.get('tacGia')
    anh = data.get('anh')
    trailer = data.get('trailer')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE phim
            SET ten_phim = ?, mo_ta = ?, thoi_luong = ?, tac_gia = ?, anh = ?, trailer = ?
            WHERE phim_id = ?
        """, (ten_phim, mo_ta, thoi_luong, tac_gia, anh, trailer, phim_id))
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Cập nhật phim thành công'}), 200
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500

# Xóa phim
@app.route('/api/phim/<int:phim_id>', methods=['DELETE'])
def xoa_phim(phim_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM phim WHERE phim_id = ?", (phim_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Xóa phim thành công'}), 200
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500

# Đặt vé
@app.route('/api/vedat', methods=['POST'])
def dat_ve():
    data = flask.request.get_json(force=True)
    ghe_da_chon = data.get('ghe_ids', [])
    suat_chieu_id = data.get('suat_chieu_id')
    nguoi_dung_id = data.get('nguoi_dung_id')
    thoi_gian_dat = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
    trang_thai = data.get('trang_thai', "Đã đặt")
    so_luong = data.get('so_luong')

    if not ghe_da_chon or not suat_chieu_id or not so_luong:
        return flask.jsonify({"success": False, "error": "Thiếu thông tin ghế, suất chiếu hoặc số lượng"}), 400

    if len(ghe_da_chon) != so_luong:
        return flask.jsonify({"success": False, "error": "Số lượng ghế không khớp với so_luong"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO ve_dat (so_luong, nguoi_dung_id, suat_chieu_id, thoi_gian_dat, trang_thai)
            OUTPUT INSERTED.ve_id
            VALUES (?, ?, ?, ?, ?)
            """,
            (so_luong, nguoi_dung_id, suat_chieu_id, thoi_gian_dat, trang_thai)
        )
        row = cursor.fetchone()
        if not row:
            raise Exception("Không tạo được vé đặt")
        ve_id = row[0]

        for ghe_id in ghe_da_chon:
            ghe_info = fetch_one(f"SELECT gia_ve, so_ghe FROM ghe WHERE ghe_id = {ghe_id}")
            if not ghe_info:
                raise Exception(f"Ghế ID {ghe_id} không tồn tại")
            gia_ve = ghe_info['gia_ve']
            cursor.execute(
                "INSERT INTO chi_tiet_ve_dat (ve_dat_id, ghe_id, gia_ve) VALUES (?, ?, ?)",
                (ve_id, ghe_id, gia_ve)
            )
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({"success": True, "maDatVe": ve_id}), 201
    except Exception as e:
        print("Lỗi đặt vé:", e)
        return flask.jsonify({"success": False, "error": str(e)}), 500

# Sửa vé
@app.route('/api/vedat/<int:ve_id>', methods=['PUT'])
def sua_ve_dat(ve_id):
    data = flask.request.get_json(force=True)
    nguoi_dung_id = data.get('nguoi_dung_id')
    suat_chieu_id = data.get('suat_chieu_id')
    ghe_ids = data.get('ghe_ids', [])
    thoi_gian_dat = data.get('thoi_gian_dat')
    trang_thai = data.get('trang_thai')
    so_luong = data.get('so_luong')

    if not all([nguoi_dung_id, suat_chieu_id, ghe_ids, thoi_gian_dat, trang_thai, so_luong]):
        return flask.jsonify({"success": False, "error": "Thiếu thông tin bắt buộc"}), 400

    if len(ghe_ids) != so_luong:
        return flask.jsonify({"success": False, "error": "Số lượng ghế không khớp với so_luong"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE ve_dat
            SET nguoi_dung_id = ?, suat_chieu_id = ?, thoi_gian_dat = ?, trang_thai = ?, so_luong = ?
            WHERE ve_id = ?
            """,
            (nguoi_dung_id, suat_chieu_id, thoi_gian_dat, trang_thai, so_luong, ve_id)
        )

        cursor.execute("DELETE FROM chi_tiet_ve_dat WHERE ve_dat_id = ?", (ve_id,))

        for ghe_id in ghe_ids:
            ghe_info = fetch_one(f"SELECT gia_ve, so_ghe FROM ghe WHERE ghe_id = {ghe_id}")
            if not ghe_info:
                return flask.jsonify({"success": False, "error": f"Ghế ID {ghe_id} không tồn tại"}), 400
            gia_ve = ghe_info['gia_ve']
            cursor.execute(
                "INSERT INTO chi_tiet_ve_dat (ve_dat_id, ghe_id, gia_ve) VALUES (?, ?, ?)",
                (ve_id, ghe_id, gia_ve)
            )

        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({"success": True, "message": "Cập nhật vé thành công"}), 200
    except Exception as e:
        print("Lỗi cập nhật vé:", e)
        return flask.jsonify({"success": False, "error": str(e)}), 500

# Xóa vé
@app.route('/api/vedat/<int:ve_id>', methods=['DELETE'])
def xoa_ve_dat(ve_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM chi_tiet_ve_dat WHERE ve_dat_id = ?", (ve_id,))
        cursor.execute("DELETE FROM ve_dat WHERE ve_id = ?", (ve_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Xóa vé thành công'}), 200
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500

# Thanh toán vé
@app.route('/api/thanhtoan', methods=['POST'])
def thanh_toan():
    data = flask.request.get_json(force=True)
    ve_id = data.get('ve_id')
    so_tien = data.get('so_tien')
    hinh_thuc = data.get('hinh_thuc')
    trang_thai = data.get('trang_thai', 'Chờ xử lý')
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO thanh_toan (ve_id, so_tien, hinh_thuc, trang_thai) VALUES (?, ?, ?, ?)",
            (ve_id, so_tien, hinh_thuc, trang_thai)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Thanh toán thành công'}), 200
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500

# Sửa thanh toán
@app.route('/api/thanhtoan/<int:thanh_toan_id>', methods=['PUT'])
def sua_thanh_toan(thanh_toan_id):
    data = flask.request.get_json(force=True)
    so_tien = data.get('so_tien')
    hinh_thuc = data.get('hinh_thuc')
    trang_thai = data.get('trang_thai')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE thanh_toan
            SET so_tien = ?, hinh_thuc = ?, trang_thai = ?
            WHERE thanh_toan_id = ?
        """, (so_tien, hinh_thuc, trang_thai, thanh_toan_id))
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Cập nhật thanh toán thành công'}), 200
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500

# Xóa thanh toán
@app.route('/api/thanhtoan/<int:thanh_toan_id>', methods=['DELETE'])
def xoa_thanh_toan(thanh_toan_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM thanh_toan WHERE thanh_toan_id = ?", (thanh_toan_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Xóa thanh toán thành công'}), 200
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500
# CRUD phòng chiếu

@app.route('/api/phongchieu', methods=['POST'])
def them_phong_chieu():
    data = flask.request.get_json()
    phong_id = data.get('phong_id')  # thêm dòng này
    ten_phong = data.get('ten_phong')
    phim_id = data.get('phim_id')
    so_ghe = data.get('so_ghe')
    if not ten_phong or phim_id is None or so_ghe is None:
        return flask.jsonify({'success': False, 'message': 'Thiếu thông tin'}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        if phong_id:  # Nếu có phong_id thì insert với phong_id
            cursor.execute(
                "INSERT INTO phong_chieu (phong_id, ten_phong, phim_id, so_ghe) VALUES (?, ?, ?, ?)",
                (phong_id, ten_phong, phim_id, so_ghe)
            )
        else:  # Không có thì để tự tăng
            cursor.execute(
                "INSERT INTO phong_chieu (ten_phong, phim_id, so_ghe) VALUES (?, ?, ?)",
                (ten_phong, phim_id, so_ghe)
            )
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Thêm phòng chiếu thành công'}), 201
    except Exception as e:
        import traceback
        print("Lỗi thêm phòng chiếu:", e)
        traceback.print_exc()
        return flask.jsonify({'success': False, 'message': str(e)}), 500
    
@app.route('/api/phongchieu/<int:phong_id>', methods=['PUT'])
def sua_phong_chieu(phong_id):
    data = flask.request.get_json()
    new_phong_id = data.get('phong_id')  # lấy phong_id mới
    ten_phong = data.get('ten_phong')
    phim_id = data.get('phim_id')
    so_ghe = data.get('so_ghe')
    if not ten_phong or phim_id is None or so_ghe is None:
        return flask.jsonify({'success': False, 'message': 'Thiếu thông tin'}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        if new_phong_id and int(new_phong_id) != phong_id:
            # Đổi cả khóa chính (phong_id)
            cursor.execute(
                "UPDATE phong_chieu SET phong_id = ?, ten_phong = ?, phim_id = ?, so_ghe = ? WHERE phong_id = ?",
                (new_phong_id, ten_phong, phim_id, so_ghe, phong_id)
            )
        else:
            cursor.execute(
                "UPDATE phong_chieu SET ten_phong = ?, phim_id = ?, so_ghe = ? WHERE phong_id = ?",
                (ten_phong, phim_id, so_ghe, phong_id)
            )
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Cập nhật phòng chiếu thành công'}), 200
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500
    
@app.route('/api/phongchieu/<int:phong_id>', methods=['DELETE'])
def xoa_phong_chieu(phong_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM phong_chieu WHERE phong_id = ?", (phong_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Xóa phòng chiếu thành công'}), 200
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500
#api Crud suất chiếu
@app.route('/api/suatchieu', methods=['POST'])
def them_suat_chieu():
    data = flask.request.get_json()
    phim_id = data.get('phim_id')
    phong_id = data.get('phong_id')
    ngay_chieu = data.get('ngay_chieu')
    gio_bat_dau = data.get('gio_bat_dau')
    if not all([phim_id, phong_id, ngay_chieu, gio_bat_dau]):
        return flask.jsonify({'success': False, 'message': 'Thiếu thông tin'}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO suat_chieu (phim_id, phong_id, ngay_chieu, gio_bat_dau) VALUES (?, ?, ?, ?)",
            (phim_id, phong_id, ngay_chieu, gio_bat_dau)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Thêm suất chiếu thành công'}), 201
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/suatchieu/<int:suat_chieu_id>', methods=['PUT'])
def sua_suat_chieu(suat_chieu_id):
    data = flask.request.get_json()
    phim_id = data.get('phim_id')
    phong_id = data.get('phong_id')
    ngay_chieu = data.get('ngay_chieu')
    gio_bat_dau = data.get('gio_bat_dau')
    if not all([phim_id, phong_id, ngay_chieu, gio_bat_dau]):
        return flask.jsonify({'success': False, 'message': 'Thiếu thông tin'}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE suat_chieu SET phim_id = ?, phong_id = ?, ngay_chieu = ?, gio_bat_dau = ? WHERE suat_chieu_id = ?",
            (phim_id, phong_id, ngay_chieu, gio_bat_dau, suat_chieu_id)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Cập nhật suất chiếu thành công'}), 200
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/suatchieu/<int:suat_chieu_id>', methods=['DELETE'])
def xoa_suat_chieu(suat_chieu_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM suat_chieu WHERE suat_chieu_id = ?", (suat_chieu_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return flask.jsonify({'success': True, 'message': 'Xóa suất chiếu thành công'}), 200
    except Exception as e:
        return flask.jsonify({'success': False, 'message': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=3000)