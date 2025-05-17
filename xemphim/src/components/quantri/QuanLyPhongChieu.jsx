import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuanLyPhongChieu = () => {
  const [phongList, setPhongList] = useState([]);
  const [phimList, setPhimList] = useState([]);
  const [form, setForm] = useState({
    ten_phong: '',
    phim_id: '',
    so_ghe: ''
  });
  const [editing, setEditing] = useState(false); // Flag to toggle edit mode
  const [currentPhong, setCurrentPhong] = useState(null); // Store the room being edited

  // Fetch room list from database
  const fetchPhongChieu = () => {
    axios.get('http://127.0.0.1:3000/api/phongchieu')
      .then(res => setPhongList(res.data))
      .catch(err => console.error('Lỗi khi tải phòng chiếu:', err));
  };

  // Fetch movie list for selection in room creation
  const fetchPhim = () => {
    axios.get('http://127.0.0.1:3000/api/phim')
      .then(res => setPhimList(res.data))
      .catch(err => console.error('Lỗi khi tải phim:', err));
  };

  useEffect(() => {
    fetchPhongChieu();
    fetchPhim();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // If in editing mode, update room
        await axios.put(`http://127.0.0.1:3000/api/phongchieu/${currentPhong.phong_id}`, form);
        setEditing(false);
        setCurrentPhong(null);
      } else {
        // Add new room
        await axios.post('/api/phongchieu', form);
      }
      setForm({ ten_phong: '', phim_id: '', so_ghe: '' });
      fetchPhongChieu();
    } catch (err) {
      console.error('Lỗi khi thêm hoặc cập nhật phòng chiếu:', err);
      alert('Không thể thêm hoặc cập nhật phòng chiếu.');
    }
  };

  const handleEdit = (phong) => {
    setEditing(true);
    setCurrentPhong(phong);
    setForm({
      ten_phong: phong.ten_phong,
      phim_id: phong.phim_id,
      so_ghe: phong.so_ghe
    });
  };

  const handleDelete = async (phong_id) => {
    try {
      await axios.delete(`/api/phongchieu/${phong_id}`);
      fetchPhongChieu();
    } catch (err) {
      console.error('Lỗi khi xóa phòng chiếu:', err);
      alert('Không thể xóa phòng chiếu.');
    }
  };

  return (
    <div className="container">
      <h2>Quản Lý Phòng Chiếu</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <select
          name="ten_phong"
          value={form.ten_phong}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">-- Chọn phòng --</option>
          {phongList.map(phong => (
            <option key={phong.phong_id} value={phong.ten_phong}>
              {phong.ten_phong}
            </option>
          ))}
        </select>

        <select
          name="phim_id"
          value={form.phim_id}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">-- Chọn phim chiếu --</option>
          {phimList.map(phim => (
            <option key={phim.phim_id} value={phim.phim_id}>
              {phim.ten_phim}
            </option>
          ))}
        </select>

        <select
          name="so_ghe"
          value={form.so_ghe}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">-- Chọn số ghế --</option>
          {[50, 100, 150, 200].map(seatCount => (
            <option key={seatCount} value={seatCount}>
              {seatCount} ghế
            </option>
          ))}
        </select>

        <button type="submit" className="submit-button">
          {editing ? 'Cập nhật phòng chiếu' : 'Thêm phòng chiếu'}
        </button>
      </form>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên phòng</th>
            <th>Phim</th>
            <th>Số ghế</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {phongList.map((phong) => {
            const tenPhim = phimList.find(p => p.phim_id === phong.phim_id)?.ten_phim || 'Chưa xác định';
            return (
              <tr key={phong.phong_id}>
                <td>{phong.phong_id}</td>
                <td>{phong.ten_phong}</td>
                <td>{tenPhim}</td>
                <td>{phong.so_ghe}</td>
                <td>
                  <button onClick={() => handleEdit(phong)} className="edit-button">Sửa</button>
                  <button onClick={() => handleDelete(phong.phong_id)} className="delete-button">Xóa</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <style jsx>{`
        .container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h2 {
          color: #333;
          margin-bottom: 20px;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }

        .input-field {
          padding: 8px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ddd;
        }

        .input-field:focus {
          outline-color: #4CAF50;
        }

        .submit-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 10px;
          border-radius: 5px;
        }

        .submit-button:hover {
          background-color: #45a049;
        }

        .styled-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ddd;
        }

        th {
          background-color: #f4f4f4;
          font-weight: bold;
        }

        td {
          background-color: #fff;
        }

        td:nth-child(odd) {
          background-color: #f9f9f9;
        }

        .edit-button, .delete-button {
          padding: 5px 10px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }

        .edit-button {
          background-color: #f39c12;
          color: white;
        }

        .edit-button:hover {
          background-color: #e67e22;
        }

        .delete-button {
          background-color: #e74c3c;
          color: white;
        }

        .delete-button:hover {
          background-color: #c0392b;
        }
      `}</style>
    </div>
  );
};

export default QuanLyPhongChieu;
