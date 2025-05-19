import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:3000/api/nguoidung';

const QuanLyNguoiDung = () => {
  const [nguoiDungList, setNguoiDungList] = useState([]);
  const [form, setForm] = useState({
    ten_dang_nhap: '',
    mat_khau: '',
    ho_ten: '',
    email: '',
    so_dien_thoai: '',
    la_quan_tri: false,
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setNguoiDungList(res.data);
    } catch (err) {
      console.error('Lỗi khi tải danh sách:', err);
      alert('Không thể tải danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API_BASE}/${currentUser.nguoidung_id}`, form);
        showMessage('✅ Cập nhật người dùng thành công!');
      } else {
        await axios.post(API_BASE, form);
        showMessage('✅ Thêm người dùng thành công!');
      }
      setForm({
        ten_dang_nhap: '',
        mat_khau: '',
        ho_ten: '',
        email: '',
        so_dien_thoai: '',
        la_quan_tri: false,
      });
      setEditing(false);
      setCurrentUser(null);
      fetchData();
    } catch (err) {
      console.error('Lỗi khi thêm/cập nhật:', err.response?.data || err.message);
      alert('Không thể thêm hoặc cập nhật người dùng.');
    }
  };

  const handleEdit = (user) => {
    setEditing(true);
    setCurrentUser(user);
    setForm({
      ten_dang_nhap: user.ten_dang_nhap,
      mat_khau: user.mat_khau,
      ho_ten: user.ho_ten,
      email: user.email,
      so_dien_thoai: user.so_dien_thoai,
      la_quan_tri: user.la_quan_tri,
    });
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) return;
    try {
      await axios.delete(`${API_BASE}/${userId}`);
      showMessage('✅ Đã xóa người dùng!');
      fetchData();
    } catch (err) {
      console.error('Lỗi khi xóa người dùng:', err.response?.data || err.message);
      alert('Không thể xóa người dùng.');
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setCurrentUser(null);
    setForm({
      ten_dang_nhap: '',
      mat_khau: '',
      ho_ten: '',
      email: '',
      so_dien_thoai: '',
      la_quan_tri: false,
    });
  };

  return (
    <div className="container">
      <h2 className="heading">Quản Lý Người Dùng</h2>

      {message && <div className="message">{message}</div>}
      {editing && (
        <p className="editing-info">
          🔧 Đang chỉnh sửa tài khoản: <strong>{currentUser?.ten_dang_nhap}</strong>
        </p>
      )}

      <form onSubmit={handleSubmit} className="form-grid">
        <input name="ten_dang_nhap" placeholder="Tên đăng nhập" value={form.ten_dang_nhap} onChange={handleChange} required />
        <input name="mat_khau" type="password" placeholder="Mật khẩu" value={form.mat_khau} onChange={handleChange} required />
        <input name="ho_ten" placeholder="Họ tên" value={form.ho_ten} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="so_dien_thoai" placeholder="Số điện thoại" value={form.so_dien_thoai} onChange={handleChange} />
        <label className="checkbox-label">
          <input type="checkbox" name="la_quan_tri" checked={form.la_quan_tri} onChange={handleChange} /> Quản trị
        </label>
        <button type="submit">{editing ? 'Cập nhật người dùng' : 'Thêm người dùng'}</button>
        {editing && (
          <button type="button" className="form-cancel" onClick={handleCancelEdit}>Huỷ chỉnh sửa</button>
        )}
      </form>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên đăng nhập</th>
              <th>Mật khẩu</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Quản trị</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {nguoiDungList.map((nd) => (
              <tr key={nd.nguoidung_id}>
                <td>{nd.nguoidung_id}</td>
                <td>{nd.ten_dang_nhap}</td>
                <td>{nd.mat_khau}</td>
                <td>{nd.ho_ten}</td>
                <td>{nd.email}</td>
                <td>{nd.so_dien_thoai}</td>
                <td>{nd.la_quan_tri ? '✔️' : '❌'}</td>
                <td>
                  <button className="btn-sua" onClick={() => handleEdit(nd)}>Sửa</button>
                  <button className="btn-xoa" onClick={() => handleDelete(nd.nguoidung_id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style>{`
        .container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .heading {
          text-align: center;
          color: rgb(0, 170, 20);
        }

        .message {
          background-color: #dff0d8;
          color: #3c763d;
          padding: 10px;
          margin-bottom: 15px;
          text-align: center;
          border-radius: 4px;
        }

        .editing-info {
          text-align: center;
          color: #e67e22;
          margin-bottom: 10px;
        }

        .form-grid {
          margin-bottom: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }

        .form-grid input,
        .form-grid button {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .form-grid button {
          grid-column: span 2;
          background-color: #27ae60;
          color: white;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .form-grid button:hover {
          background-color: #1e8449;
        }

        .form-cancel {
          grid-column: span 2;
          background-color: #95a5a6;
          color: white;
          border: none;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .form-cancel:hover {
          background-color: #7f8c8d;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .styled-table {
          width: 100%;
          border-collapse: collapse;
        }

        .styled-table th,
        .styled-table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: center;
        }

        .styled-table th {
          background-color: #f2f2f2;
        }

        .styled-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .btn-sua {
          background-color: #f39c12;
          color: white;
          border: none;
          padding: 5px 10px;
          margin-right: 5px;
          cursor: pointer;
          border-radius: 4px;
        }

        .btn-sua:hover {
          background-color: #e67e22;
        }

        .btn-xoa {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 4px;
        }

        .btn-xoa:hover {
          background-color: #c0392b;
        }
      `}</style>
    </div>
  );
};

export default QuanLyNguoiDung;
