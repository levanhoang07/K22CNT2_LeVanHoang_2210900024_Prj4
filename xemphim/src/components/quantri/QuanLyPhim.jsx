import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function QuanLyPhim() {
  const API_BASE = 'http://127.0.0.1:3000/api/phim';

  const [phimList, setPhimList] = useState([]);
  const [ten, setTen] = useState('');
  const [tacGia, setTacGia] = useState('');
  const [thoiLuong, setThoiLuong] = useState('');
  const [anh, setAnh] = useState('');
  const [moTa, setMoTa] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentPhim, setCurrentPhim] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(API_BASE)
      .then(res => setPhimList(res.data))
      .catch(err => console.error('Lỗi khi tải danh sách phim:', err));
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleXoaPhim = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa phim này không?')) {
      axios.delete(`${API_BASE}/${id}`)
        .then(() => {
          fetchData();
          showMessage('✅ Đã xóa phim thành công!');
        })
        .catch(err => {
          console.error('Lỗi khi xóa phim:', err);
          alert('❌ Không thể xóa phim.');
        });
    }
  };

  const handleThemPhim = (e) => {
    e.preventDefault();
    const newPhim = { ten, tacGia, thoiLuong, anh, moTa };

    if (editing) {
      axios.put(`${API_BASE}/${currentPhim.id}`, newPhim)
        .then(() => {
          fetchData();
          showMessage('✅ Cập nhật phim thành công!');
          setEditing(false);
          setCurrentPhim(null);
          resetForm();
        })
        .catch(err => {
          console.error('Lỗi khi cập nhật phim:', err);
          alert('❌ Không thể cập nhật phim.');
        });
    } else {
      axios.post(API_BASE, newPhim)
        .then(() => {
          fetchData();
          showMessage('✅ Thêm phim thành công!');
          resetForm();
        })
        .catch(err => {
          console.error('Lỗi khi thêm phim:', err);
          alert('❌ Không thể thêm phim.');
        });
    }
  };

  const handleEditPhim = (phim) => {
    setEditing(true);
    setCurrentPhim(phim);
    setTen(phim.ten);
    setTacGia(phim.tacGia);
    setThoiLuong(phim.thoiLuong);
    setAnh(phim.anh);
    setMoTa(phim.moTa);
  };

  const resetForm = () => {
    setTen('');
    setTacGia('');
    setThoiLuong('');
    setAnh('');
    setMoTa('');
    setEditing(false);
    setCurrentPhim(null);
  };

  return (
    <div className="container">
      <h3 className="title">Quản lý Phim</h3>

      {message && <div className="message">{message}</div>}
      {editing && (
        <p className="editing-info">
          🔧 Đang chỉnh sửa phim: <strong>{currentPhim?.ten}</strong>
        </p>
      )}

      <form onSubmit={handleThemPhim} className="form-grid">
        <input type="text" placeholder="Tên Phim" value={ten} onChange={(e) => setTen(e.target.value)} required />
        <input type="text" placeholder="Tác Giả" value={tacGia} onChange={(e) => setTacGia(e.target.value)} required />
        <input type="text" placeholder="Thời Lượng" value={thoiLuong} onChange={(e) => setThoiLuong(e.target.value)} required />
        <input type="text" placeholder="Link ảnh" value={anh} onChange={(e) => setAnh(e.target.value)} required />
        <input type="text" placeholder="Mô Tả" value={moTa} onChange={(e) => setMoTa(e.target.value)} required />
        <button type="submit">{editing ? 'Cập nhật Phim' : 'Lưu Phim'}</button>
        {editing && (
          <button type="button" onClick={resetForm} className="cancel-button">Hủy</button>
        )}
      </form>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Tên Phim</th>
            <th>Tác Giả</th>
            <th>Thời Lượng</th>
            <th>Ảnh</th>
            <th>Mô Tả</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {phimList.map((phim) => (
            <tr key={phim.id}>
              <td>{phim.ten}</td>
              <td>{phim.tacGia}</td>
              <td>{phim.thoiLuong}</td>
              <td>
                {phim.anh ? (
                  <img src={phim.anh} alt={phim.ten} style={{ width: '80px', height: 'auto' }} />
                ) : (
                  'Chưa có ảnh'
                )}
              </td>
              <td>{phim.moTa}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditPhim(phim)}>Sửa</button>
                <button className="delete-button" onClick={() => handleXoaPhim(phim.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .title {
          text-align: center;
          color: #2c3e50;
        }
        .message {
          background-color: #dff0d8;
          color: #3c763d;
          padding: 10px;
          margin: 10px 0;
          border-radius: 5px;
          text-align: center;
        }
        .editing-info {
          text-align: center;
          color: #e67e22;
          margin-bottom: 10px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
          margin-bottom: 30px;
        }
        .form-grid input,
        .form-grid button {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .form-grid button {
          background-color: #27ae60;
          color: white;
          border: none;
          cursor: pointer;
        }
        .form-grid button:hover {
          background-color: #1e8449;
        }
        .cancel-button {
          background-color: #7f8c8d !important;
        }
        .cancel-button:hover {
          background-color: #606c76 !important;
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
          vertical-align: middle;
        }
        .styled-table th {
          background-color: #f5f5f5;
        }
        .styled-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .edit-button {
          background-color: orange;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 5px;
        }
        .edit-button:hover {
          background-color: darkorange;
        }
        .delete-button {
          background-color: red;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .delete-button:hover {
          background-color: darkred;
        }
      `}</style>
    </div>
  );
}
