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
  const [currentPhim, setCurrentPhim] = useState(null); // movie đang sửa
  const [detailPhim, setDetailPhim] = useState(null);   // movie đang xem chi tiết

  useEffect(() => {
    axios.get('/api/phim')
      .then(res => setPhimList(res.data))
      .catch(err => console.error('Lỗi khi tải danh sách phim:', err));
  }, []);

  const handleXoaPhim = (id) => {
    axios.delete(`/api/phim/${id}`)
      .then(() => {
        setPhimList(phimList.filter(phim => phim.id !== id));
        if (detailPhim && detailPhim.id === id) {
          setDetailPhim(null); // xóa chi tiết nếu đang xem phim này
        }
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
          if (detailPhim && detailPhim.id === res.data.id) {
            setDetailPhim(res.data); // cập nhật chi tiết nếu đang xem
          }
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

  // Xem chi tiết phim
  const handleViewPhim = (phim) => {
    setDetailPhim(phim);
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

      <div className="form-container">
        <form onSubmit={handleThemPhim} className="form-grid">
          <input
            type="text"
            placeholder="Tên Phim"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Tác Giả"
            value={tacGia}
            onChange={(e) => setTacGia(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Thời Lượng"
            value={thoiLuong}
            onChange={(e) => setThoiLuong(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Giá Vé"
            value={giaTien}
            onChange={(e) => setGiaTien(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Link ảnh"
            value={anh}
            onChange={(e) => setAnh(e.target.value)}
            required
          />
          <button type="submit">{editing ? 'Cập nhật Phim' : 'Lưu Phim'}</button>
        </form>
      </div>

      <div className="table-container">
        <h4>Danh sách phim</h4>
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
                  <button className="view-button" onClick={() => handleViewPhim(phim)}>Xem</button>
                  <button className="edit-button" onClick={() => handleEditPhim(phim)}>Sửa</button>
                  <button className="delete-button" onClick={() => handleXoaPhim(phim.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hiển thị thông tin phim chi tiết nếu có */}
      {detailPhim && (
        <div className="detail-container">
          <h4>Thông tin chi tiết phim</h4>
          <p><strong>Tên Phim:</strong> {detailPhim.ten}</p>
          <p><strong>Tác Giả:</strong> {detailPhim.tacGia}</p>
          <p><strong>Thời Lượng:</strong> {detailPhim.thoiLuong}</p>
          <p><strong>Giá Vé:</strong> {detailPhim.giaTien}</p>
          <img src={detailPhim.anh} alt={detailPhim.ten} style={{ maxWidth: '300px', borderRadius: '8px' }} />
          <button onClick={() => setDetailPhim(null)} style={{ marginTop: '10px' }}>Đóng</button>
        </div>
      )}

      <style>{`
        .container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .title {
          text-align: center;
          color: #2c3e50;
        }
        .form-container {
          margin-bottom: 30px;
        }
        .form-grid {
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
          background-color: #27ae60;
          color: white;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .form-grid button:hover {
          background-color: #1e8449;
        }
        .table-container {
          margin-top: 20px;
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
          color: white;
          background-color: orange;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          margin-left: 5px;
        }
        .edit-button:hover {
          background-color: darkorange;
        }
        .delete-button {
          color: white;
          background-color: red;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          margin-left: 5px;
        }
        .delete-button:hover {
          background-color: darkred;
        }
        .view-button {
          color: white;
          background-color: #2980b9;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .view-button:hover {
          background-color: #1f618d;
        }
        .detail-container {
          margin-top: 30px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          max-width: 400px;
          background-color: #fafafa;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
