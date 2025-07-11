import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuanLyPhongChieu = () => {
  const [phongList, setPhongList] = useState([]);
  const [phimList, setPhimList] = useState([]);
  const [form, setForm] = useState({
    phong_id: '',
    ten_phong: '',
    phim_id: '',
    so_ghe: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentPhong, setCurrentPhong] = useState(null);

  // Lấy danh sách phòng chiếu
  const fetchPhongChieu = () => {
    axios.get('http://localhost:3000/api/phongchieu')
      .then(res => setPhongList(res.data))
      .catch(err => console.error('Lỗi khi tải phòng chiếu:', err));
  };

  // Lấy danh sách phim
  const fetchPhim = () => {
    axios.get('http://localhost:3000/api/phim')
      .then(res => setPhimList(res.data))
      .catch(err => console.error('Lỗi khi tải phim:', err));
  };

  useEffect(() => {
    fetchPhongChieu();
    fetchPhim();
  }, []);

  // Xử lý thay đổi form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Thêm hoặc cập nhật phòng chiếu
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = {
      phong_id: form.phong_id ? Number(form.phong_id) : undefined, // gửi lên nếu có
      ten_phong: form.ten_phong,
      phim_id: Number(form.phim_id),
      so_ghe: Number(form.so_ghe)
    };
    if (!editing) {
      await axios.post('http://localhost:3000/api/phongchieu', data);
    } else {
      await axios.put(`http://localhost:3000/api/phongchieu/${currentPhong.phong_id}`, data);
      setEditing(false);
      setCurrentPhong(null);
    }
    setForm({ phong_id: '', ten_phong: '', phim_id: '', so_ghe: '' });
    fetchPhongChieu();
  } catch (err) {
    console.error('Lỗi khi thêm hoặc cập nhật phòng chiếu:', err.response ? err.response.data : err);
    alert('Không thể thêm hoặc cập nhật phòng chiếu.');
  }
};

  // Sửa phòng chiếu
  const handleEdit = (phong) => {
  setEditing(true);
  setCurrentPhong(phong);
  setForm({
    phong_id: phong.phong_id.toString(), // thêm dòng này
    ten_phong: phong.ten_phong,
    phim_id: phong.phim_id,
    so_ghe: phong.so_ghe.toString()
  });
};

  // Hủy sửa
  const handleCancel = () => {
    setEditing(false);
    setCurrentPhong(null);
    setForm({ ten_phong: '', phim_id: '', so_ghe: '' });
  };

  // Xóa phòng chiếu
  const handleDelete = async (phong_id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phòng chiếu này?')) {
      try {
        await axios.delete(`http://localhost:3000/api/phongchieu/${phong_id}`);
        fetchPhongChieu();
      } catch (err) {
        console.error('Lỗi khi xóa phòng chiếu:', err);
        alert('Không thể xóa phòng chiếu.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Quản Lý Phòng Chiếu</h2>

      {editing && currentPhong && (
        <div style={{ marginBottom: '10px', padding: '10px', border: '1px solid #f39c12', backgroundColor: '#fff3e0' }}>
          <strong>Đang chỉnh sửa phòng: {currentPhong.ten_phong}</strong>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-container">
  <input
    type="number"
    name="phong_id"
    value={form.phong_id}
    onChange={handleChange}
    placeholder="ID phòng"
    className="input-field"
    disabled={editing} // chỉ cho nhập khi thêm mới
  />

  <input
    type="text"
    name="ten_phong"
    value={form.ten_phong}
    onChange={handleChange}
    placeholder="Tên phòng"
    required
    className="input-field"
    // Cho phép sửa tên phòng, KHÔNG disabled khi editing
  />

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

  <input
    type="number"
    name="so_ghe"
    value={form.so_ghe}
    onChange={handleChange}
    placeholder="Số ghế"
    required
    className="input-field"
  />

  <div style={{ display: 'flex', gap: '10px' }}>
    <button type="submit" className="submit-button">
      {editing ? 'Cập nhật phòng chiếu' : 'Thêm phòng chiếu'}
    </button>
    {editing && (
      <button
        type="button"
        onClick={handleCancel}
        className="cancel-button"
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
          outline-color:rgb(66, 137, 68);
        }
        .submit-button {
          background-color:rgb(66, 133, 69);
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
        .cancel-button {
          background-color: #888;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 10px;
          border-radius: 5px;
        }
        .cancel-button:hover {
          background-color: #555;
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
          padding: 8px 12px;
          margin-right: 5px;
        }
        .edit-button:hover {
          background-color: #e67e22;
        }
        .delete-button {
          background-color: #e74c3c;
          color: white;
          padding: 8px 12px;
        }
        .delete-button:hover {
          background-color: #c0392b;
        }
      `}</style>
    </div>
  );
};

export default QuanLyPhongChieu;