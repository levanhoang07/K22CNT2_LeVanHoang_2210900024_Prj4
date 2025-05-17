import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuanLyGhe = () => {
  const [gheList, setGheList] = useState([]);
  const [phongList, setPhongList] = useState([]);
  const [form, setForm] = useState({
    phong_id: '',
    so_ghe: '',
    loai_ghe: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentGhe, setCurrentGhe] = useState(null);

  const fetchGhe = () => {
    axios.get('http://127.0.0.1:3000/api/ghe')
      .then(res => setGheList(res.data))
      .catch(err => console.error('Lỗi khi tải danh sách ghế:', err));
  };

  const fetchPhong = () => {
    axios.get('http://127.0.0.1:3000/api/phongchieu')
      .then(res => setPhongList(res.data))
      .catch(err => console.error('Lỗi khi tải phòng:', err));
  };

  useEffect(() => {
    fetchGhe();
    fetchPhong();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`/api/ghe/${currentGhe.ghe_id}`, form);
        setEditing(false);
        setCurrentGhe(null);
      } else {
        await axios.post('/api/ghe', form);
      }
      setForm({ phong_id: '', so_ghe: '', loai_ghe: '' });
      fetchGhe();
    } catch (err) {
      console.error('Lỗi khi thêm hoặc cập nhật ghế:', err);
      alert('Không thể thêm hoặc cập nhật ghế.');
    }
  };

  const handleEdit = (ghe) => {
    setEditing(true);
    setCurrentGhe(ghe);
    setForm({
      phong_id: ghe.phong_id,
      so_ghe: ghe.so_ghe,
      loai_ghe: ghe.loai_ghe,
    });
  };

  const handleDelete = async (ghe_id) => {
    try {
      await axios.delete(`/api/ghe/${ghe_id}`);
      fetchGhe();
    } catch (err) {
      console.error('Lỗi khi xóa ghế:', err);
      alert('Không thể xóa ghế.');
    }
  };

  return (
    <div className="container">
      <h2>Quản Lý Ghế</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <select
          name="phong_id"
          value={form.phong_id}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">-- Chọn phòng --</option>
          {phongList.map(phong => (
            <option key={phong.phong_id} value={phong.phong_id}>
              {phong.ten_phong}
            </option>
          ))}
        </select>
        <input
          name="so_ghe"
          placeholder="Số ghế (VD: A1)"
          value={form.so_ghe}
          onChange={handleChange}
          required
          className="input-field"
        />
        <select
          name="loai_ghe"
          value={form.loai_ghe}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">-- Loại ghế --</option>
          <option value="Thuong">Thường</option>
          <option value="VIP">VIP</option>
        </select>
        <button type="submit" className="submit-button">
          {editing ? 'Cập nhật ghế' : 'Thêm ghế'}
        </button>
      </form>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Phòng</th>
            <th>Số ghế</th>
            <th>Loại ghế</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {gheList.map(ghe => {
            const tenPhong = phongList.find(p => p.phong_id === ghe.phong_id)?.ten_phong || 'Không rõ';
            return (
              <tr key={ghe.ghe_id}>
                <td>{ghe.ghe_id}</td>
                <td>{tenPhong}</td>
                <td>{ghe.so_ghe}</td>
                <td>{ghe.loai_ghe}</td>
                <td>
                  <button onClick={() => handleEdit(ghe)} className="edit-button">Sửa</button>
                  <button onClick={() => handleDelete(ghe.ghe_id)} className="delete-button">Xóa</button>
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

export default QuanLyGhe;
