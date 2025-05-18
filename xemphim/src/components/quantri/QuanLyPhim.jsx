import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function QuanLyPhim() {
  const [phimList, setPhimList] = useState([]);
  const [ten, setTen] = useState('');
  const [tacGia, setTacGia] = useState('');
  const [thoiLuong, setThoiLuong] = useState('');
  const [giaTien, setGiaTien] = useState('');
  const [anh, setAnh] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentPhim, setCurrentPhim] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/phim')
      .then(res => setPhimList(res.data))
      .catch(err => console.error('Lỗi khi tải danh sách phim:', err));
  }, []);

  const handleXoaPhim = (id) => {
    axios.delete(`/api/phim/${id}`)
      .then(() => {
        setPhimList(phimList.filter(phim => phim.id !== id));
      })
      .catch(err => console.error('Lỗi khi xóa phim:', err));
  };

  const handleThemPhim = (e) => {
    e.preventDefault();
    const newPhim = { ten, tacGia, thoiLuong, giaTien, anh };

    if (editing) {
      axios.put(`/api/phim/${currentPhim.id}`, newPhim)
        .then(res => {
          setPhimList(phimList.map(phim => (phim.id === currentPhim.id ? res.data : phim)));
          setEditing(false);
          setCurrentPhim(null);
          resetForm();
        })
        .catch(err => {
          console.error('Lỗi khi cập nhật phim:', err);
          alert('Không thể cập nhật phim.');
        });
    } else {
      axios.post('/api/phim', newPhim)
        .then(res => {
          setPhimList([...phimList, res.data]);
          resetForm();
        })
        .catch(err => {
          console.error('Lỗi khi thêm phim:', err);
          alert('Không thể thêm phim.');
        });
    }
  };

  const handleEditPhim = (phim) => {
    setEditing(true);
    setCurrentPhim(phim);
    setTen(phim.ten);
    setTacGia(phim.tacGia);
    setThoiLuong(phim.thoiLuong);
    setGiaTien(phim.giaTien);
    setAnh(phim.anh);
  };

  const resetForm = () => {
    setTen('');
    setTacGia('');
    setThoiLuong('');
    setGiaTien('');
    setAnh('');
  };

  return (
    <div className="container">
      <h3 className="title">Quản lý Phim</h3>

      <form onSubmit={handleThemPhim} className="form-grid">
        <input type="text" placeholder="Tên Phim" value={ten} onChange={(e) => setTen(e.target.value)} required />
        <input type="text" placeholder="Tác Giả" value={tacGia} onChange={(e) => setTacGia(e.target.value)} required />
        <input type="text" placeholder="Thời Lượng" value={thoiLuong} onChange={(e) => setThoiLuong(e.target.value)} required />
        <input type="text" placeholder="Giá Vé" value={giaTien} onChange={(e) => setGiaTien(e.target.value)} required />
        <input type="text" placeholder="Link ảnh" value={anh} onChange={(e) => setAnh(e.target.value)} required />
        <button type="submit">{editing ? 'Cập nhật Phim' : 'Lưu Phim'}</button>
      </form>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Tên Phim</th>
            <th>Tác Giả</th>
            <th>Thời Lượng</th>
            <th>Giá Vé</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {phimList.map((phim) => (
            <tr key={phim.id}>
              <td>{phim.ten}</td>
              <td>{phim.tacGia}</td>
              <td>{phim.thoiLuong}</td>
              <td>{phim.giaTien}</td>
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
