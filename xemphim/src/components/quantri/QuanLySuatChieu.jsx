import React, { useState } from 'react';

export default function QuanLySuatChieu() {
  // Danh sách phim
  const [danhSachPhim] = useState([
    { id: 1, ten: 'Mắt Biếc', moTa: 'Phim tình cảm học đường.', anh: 'https://th.bing.com/th/id/R.ced5017cb4ee94fe71611036f6a89a36?rik=XGQVDZCpFRmYsw&pid=ImgRaw&r=0' },
    { id: 2, ten: 'Hai Phượng', moTa: 'Phim hành động Việt Nam.', anh: 'https://th.bing.com/th/id/R.52a8160aa3cf0afa720d31755c9c0b04?rik=BmNRA1LTlnolsw&riu=http%3a%2f%2fwww.impawards.com%2fintl%2fvietnam%2f2019%2fposters%2fhai_phuong_ver2.jpg&ehk=yP51yBZZ8o4wHgUpd4C%2bPRgoMYPhVI8KWhYIZcvjAD0%3d&risl=&pid=ImgRaw&r=0' },
    { id: 3, ten: 'Em Chưa 18', moTa: 'Phim hài lãng mạn tuổi teen.', anh: 'https://static.tuoitre.vn/tto/i/s626/2017/04/06/1-1491445646.jpg' },
    { id: 4, ten: 'Bố Già', moTa: 'Phim gia đình cảm động.', anh: 'https://th.bing.com/th/id/OIP.o9DHR35-qyyhNEhhiI8nlQHaK-?rs=1&pid=ImgDetMain' },
    { id: 5, ten: 'Tiệc Trăng Máu', moTa: 'Phim tâm lý xã hội.', anh: 'https://th.bing.com/th/id/OIP.wBnourAYqCKkpYk0tqm_NwAAAA?rs=1&pid=ImgDetMain' },
    { id: 6, ten: 'Ròm', moTa: 'Phim về tuổi trẻ và đường phố.', anh: 'https://th.bing.com/th/id/OIP.vLOAqQuI9p8eghlQsvzXAgHaK-?rs=1&pid=ImgDetMain' },
    { id: 7, ten: 'Tháng Năm Rực Rỡ', moTa: 'Phim thanh xuân nữ sinh.', anh: 'https://th.bing.com/th/id/OIP.SaMkkU3u5qmFGVagrNMeJgHaK-?rs=1&pid=ImgDetMain' },
    { id: 8, ten: 'Lật Mặt 7', moTa: 'Phim tình cảm gia đình.', anh: 'https://th.bing.com/th/id/OIP.zvN3Ljo5Cz94IMPkEVP31AHaLH?rs=1&pid=ImgDetMain' },
    { id: 9, ten: 'Trạng Tí', moTa: 'Phim phiêu lưu hài hước.', anh: 'https://touchcinema.com/uploads/phim-2021/61b4633451b0a2eefba1-poster.jpg' },
    { id: 10, ten: 'Avatar 22', moTa: 'Phim khoa học viễn tưởng.', anh: 'https://th.bing.com/th/id/R.88386fe549d83e6ae16b49f8543e4baa?rik=lEi3KbbTR1V1hw&pid=ImgRaw&r=0' },
  ]);

  // Danh sách suất chiếu
  const [danhSachSuatChieu] = useState([
    { id: 1, ten: 'Phim A', gioChieu: '10:00 AM' },
    { id: 2, ten: 'Phim B', gioChieu: '01:00 PM' },
    { id: 3, ten: 'Phim C', gioChieu: '04:00 PM' },
  ]);

  // Danh sách vé và thông tin khách hàng
  const [danhSachVes, setDanhSachVes] = useState([
    { id: 1, suatChieuId: 1, soLuongVe: 2, giaVe: 150000, trangThai: 'Đã đặt', tenPhim: 'Phim A', tenKhachHang: 'Nguyễn Văn A', email: 'a@example.com' },
    { id: 2, suatChieuId: 2, soLuongVe: 1, giaVe: 150000, trangThai: 'Đã đặt', tenPhim: 'Phim B', tenKhachHang: 'Trần Thị B', email: 'b@example.com' },
  ]);

  // Thông tin vé mới
  const [veMoi, setVeMoi] = useState({
    suatChieuId: '',
    soLuongVe: 1,
    giaVe: 150000,
    trangThai: 'Đã đặt',
    tenKhachHang: '',
    email: '',
  });

  // Hàm thay đổi thông tin vé
  const handleThayDoi = (e) => {
    const { name, value } = e.target;
    setVeMoi((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm thêm vé mới vào danh sách
  const handleDatVe = () => {
    if (!veMoi.suatChieuId || !veMoi.soLuongVe || !veMoi.tenKhachHang || !veMoi.email) return;

    const veDaDat = {
      ...veMoi,
      id: danhSachVes.length + 1,
      tenPhim: danhSachSuatChieu.find((sc) => sc.id === parseInt(veMoi.suatChieuId)).ten,
    };
    
    setDanhSachVes([...danhSachVes, veDaDat]);
    setVeMoi({ suatChieuId: '', soLuongVe: 1, giaVe: 150000, trangThai: 'Đã đặt', tenKhachHang: '', email: '' });
  };

  // Hàm xóa vé
  const handleXoaVe = (id) => {
    const danhSachMoi = danhSachVes.filter((ve) => ve.id !== id);
    setDanhSachVes(danhSachMoi);
  };

  // Hàm cập nhật trạng thái vé
  const handleCapNhatTrangThai = (id, trangThai) => {
    const danhSachMoi = danhSachVes.map((ve) =>
      ve.id === id ? { ...ve, trangThai } : ve
    );
    setDanhSachVes(danhSachMoi);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Quản Lý Vé Cho Admin</h2>

      <div style={{ marginBottom: '20px' }}>
        <select
          name="suatChieuId"
          value={veMoi.suatChieuId}
          onChange={handleThayDoi}
          style={{ padding: '8px', marginRight: '10px' }}
        >
          <option value="">Chọn suất chiếu</option>
          {danhSachPhim.map((phim) => (
            <option key={phim.id} value={phim.id}>
              {phim.ten} - {phim.moTa}
            </option>
          ))}
        </select>
        
        <input
          style={{ padding: '8px', marginRight: '10px' }}
          type="number"
          name="soLuongVe"
          value={veMoi.soLuongVe}
          onChange={handleThayDoi}
          min="1"
          placeholder="Số lượng vé"
        />

        <input
          style={{ padding: '8px', marginRight: '10px' }}
          type="text"
          name="tenKhachHang"
          value={veMoi.tenKhachHang}
          onChange={handleThayDoi}
          placeholder="Tên khách hàng"
        />

        <input
          style={{ padding: '8px', marginRight: '10px' }}
          type="email"
          name="email"
          value={veMoi.email}
          onChange={handleThayDoi}
          placeholder="Email khách hàng"
        />

        <button
          onClick={handleDatVe}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Thêm Vé
        </button>
      </div>

      <h3>Danh Sách Vé Đặt</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID Vé</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tên Phim</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Số Lượng Vé</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Giá Vé</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Trạng Thái</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tên Khách Hàng</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {danhSachVes.map((ve) => (
            <tr key={ve.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ve.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ve.tenPhim}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ve.soLuongVe}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ve.giaVe} VND</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <select
                  value={ve.trangThai}
                  onChange={(e) => handleCapNhatTrangThai(ve.id, e.target.value)}
                  style={{ padding: '5px' }}
                >
                  <option value="Đã đặt">Đã đặt</option>
                  <option value="Đã thanh toán">Đã thanh toán</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ve.tenKhachHang}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ve.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button
                  onClick={() => handleXoaVe(ve.id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
