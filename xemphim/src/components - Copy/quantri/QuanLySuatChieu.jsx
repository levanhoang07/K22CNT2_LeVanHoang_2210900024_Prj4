import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuanLySuatChieu = () => {
  const [suatList, setSuatList] = useState([]);
  const [phimList, setPhimList] = useState([]);
  const [phongList, setPhongList] = useState([]);
  const [form, setForm] = useState({
    phim_id: '',
    phong_id: '',
    ngay_chieu: '',
    gio_bat_dau: '',
    gia_ve: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentSuat, setCurrentSuat] = useState(null);  // Store the current showtime being edited

  const fetchSuatChieu = () => {
    axios.get('http://127.0.0.1:3000/api/suatchieu')
      .then(res => setSuatList(res.data))
      .catch(err => console.error('Lỗi khi tải suất chiếu:', err));
  };

  const fetchPhim = () => {
    axios.get('/api/phim')
      .then(res => setPhimList(res.data))
      .catch(err => console.error('Lỗi khi tải phim:', err));
  };

  const fetchPhong = () => {
    axios.get('/api/phongchieu')
      .then(res => setPhongList(res.data))
      .catch(err => console.error('Lỗi khi tải phòng chiếu:', err));
  };

  useEffect(() => {
    fetchSuatChieu();
    fetchPhim();
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
        // Update existing showtime
        await axios.put(`/api/suatchieu/${currentSuat.suat_chieu_id}`, form);
        setEditing(false);  // Reset edit mode
      } else {
        // Create new showtime
        await axios.post('/api/suatchieu', form);
      }
      setForm({ phim_id: '', phong_id: '', ngay_chieu: '', gio_bat_dau: '', gia_ve: '' });
      fetchSuatChieu();
    } catch (err) {
      console.error('Lỗi khi thêm hoặc cập nhật suất chiếu:', err);
      alert('Không thể thêm hoặc cập nhật suất chiếu.');
    }
  };

  const handleEdit = (suat) => {
    setEditing(true);
    setCurrentSuat(suat);
    setForm({
      phim_id: suat.phim_id,
      phong_id: suat.phong_id,
      ngay_chieu: suat.ngay_chieu,
      gio_bat_dau: suat.gio_bat_dau,
      gia_ve: suat.gia_ve
    });
  };

  const handleDelete = async (suat_id) => {
    try {
      await axios.delete(`/api/suatchieu/${suat_id}`);
      fetchSuatChieu();
    } catch (err) {
      console.error('Lỗi khi xóa suất chiếu:', err);
      alert('Không thể xóa suất chiếu.');
    }
  };

  return (
    <div className="container">
      <h2>Quản Lý Suất Chiếu</h2>

      <form onSubmit={handleSubmit}>
        <select
          name="phim_id"
          value={form.phim_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn phim --</option>
          {phimList.map(phim => (
            <option key={phim.phim_id} value={phim.phim_id}>
              {phim.ten_phim}
            </option>
          ))}
        </select>

        <select
          name="phong_id"
          value={form.phong_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn phòng chiếu --</option>
          {phongList.map(phong => (
            <option key={phong.phong_id} value={phong.phong_id}>
              {phong.ten_phong}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="ngay_chieu"
          value={form.ngay_chieu}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="gio_bat_dau"
          value={form.gio_bat_dau}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="gia_ve"
          placeholder="Giá vé"
          value={form.gia_ve}
          onChange={handleChange}
          required
        />
        <button type="submit">{editing ? 'Cập nhật suất chiếu' : 'Thêm suất chiếu'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Phim</th>
            <th>Phòng</th>
            <th>Ngày chiếu</th>
            <th>Giờ bắt đầu</th>
            <th>Giá vé</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {suatList.map((suat) => {
            const tenPhim = phimList.find(p => p.phim_id === suat.phim_id)?.ten_phim || 'Không rõ';
            const tenPhong = phongList.find(p => p.phong_id === suat.phong_id)?.ten_phong || 'Không rõ';
            return (
              <tr key={suat.suat_chieu_id}>
                <td>{suat.suat_chieu_id}</td>
                <td>{tenPhim}</td>
                <td>{tenPhong}</td>
                <td>{suat.ngay_chieu}</td>
                <td>{suat.gio_bat_dau}</td>
                <td>{parseInt(suat.gia_ve).toLocaleString()} đ</td>
                <td>
                  <button onClick={() => handleEdit(suat)}>Sửa</button>
                  <button onClick={() => handleDelete(suat.suat_chieu_id)}>Xóa</button>
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

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }

        select, input, button {
          padding: 8px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ddd;
        }

        select:focus, input:focus {
          outline-color: #4CAF50;
        }

        button {
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }

        button:hover {
          background-color: #45a049;
        }

        table {
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
      `}</style>
    </div>
  );
};

export default QuanLySuatChieu;
