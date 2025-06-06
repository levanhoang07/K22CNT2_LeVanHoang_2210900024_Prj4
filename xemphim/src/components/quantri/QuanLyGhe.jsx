import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuanLyGhe = () => {
  const [gheList, setGheList] = useState([]);
  const [phongList, setPhongList] = useState([]);
  const [form, setForm] = useState({
    phong_id: '',
    so_ghe: '',
    loai_ghe: '',
    gia_ve: 0
  });
  const [editing, setEditing] = useState(false);
  const [currentGhe, setCurrentGhe] = useState(null);
  const [loading, setLoading] = useState(false);

  axios.defaults.baseURL = 'http://127.0.0.1:3000/api';

  const fetchGhe = () => {
    axios.get('/ghe')
      .then(res => setGheList(res.data))
      .catch(err => console.error('Lỗi khi tải danh sách ghế:', err));
  };

  const fetchPhong = () => {
    axios.get('/phongchieu')
      .then(res => setPhongList(res.data))
      .catch(err => console.error('Lỗi khi tải phòng:', err));
  };

  useEffect(() => {
    fetchGhe();
    fetchPhong();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "gia_ve" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await axios.put(`/ghe/${currentGhe.ghe_id}`, form);
        setEditing(false);
        setCurrentGhe(null);
      } else {
        await axios.post('/ghe', form);
      }
      setForm({ phong_id: '', so_ghe: '', loai_ghe: '', gia_ve: 0 });
      fetchGhe();
    } catch (err) {
      console.error('Lỗi khi thêm hoặc cập nhật ghế:', err);
      alert('Không thể thêm hoặc cập nhật ghế.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ghe) => {
    setEditing(true);
    setCurrentGhe(ghe);
    setForm({
      phong_id: ghe.phong_id,
      so_ghe: ghe.so_ghe,
      loai_ghe: ghe.loai_ghe,
      gia_ve: ghe.gia_ve
    });
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setCurrentGhe(null);
    setForm({ phong_id: '', so_ghe: '', loai_ghe: '', gia_ve: 0 });
  };

  const handleDelete = async (ghe_id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa ghế này không?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/ghe/${ghe_id}`);
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
        {editing && currentGhe && (
          <div className="editing-info">
            Đang chỉnh sửa ghế ID: <strong>{currentGhe.ghe_id}</strong>
          </div>
        )}

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
          <option value="Thường">Thường</option>
          <option value="VIP">VIP</option>
        </select>
        <input
          type="number"
          name="gia_ve"
          placeholder="Giá vé"
          min={0}
          value={form.gia_ve}
          onChange={handleChange}
          required
          className="input-field"
        />
        <div className="button-group">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Đang xử lý...' : editing ? 'Cập nhật ghế' : 'Thêm ghế'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="cancel-button"
              disabled={loading}
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Phòng</th>
            <th>Số ghế</th>
            <th>Loại ghế</th>
            <th>Giá vé</th>
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
                <td>{ghe.gia_ve?.toLocaleString("vi-VN")} đ</td>
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

        .editing-info {
          color: #e67e22; /* vàng cam */
          font-size: 14px;
          margin-bottom: 5px;
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

        .button-group {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .submit-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 10px 20px;
          border-radius: 5px;
        }

        .submit-button:hover:enabled {
          background-color: #45a049;
        }

        .submit-button:disabled {
          background-color: #a5d6a7;
          cursor: not-allowed;
        }

        .cancel-button {
          background-color: #95a5a6;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .cancel-button:hover:enabled {
          background-color: #7f8c8d;
        }
        .cancel-button:disabled {
          cursor: not-allowed;
          opacity: 0.7;
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

        .edit-button {
          background-color: #f39c12;
          color: white;
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          margin-right: 5px;
          cursor: pointer;
        }

        .edit-button:hover {
          background-color: #e67e22;
        }

        .delete-button {
          background-color: #e74c3c;
          color: white;
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .delete-button:hover {
          background-color: #c0392b;
        }
      `}</style>
    </div>
  );
};

export default QuanLyGhe;
