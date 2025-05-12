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

  // Lấy danh sách phòng chiếu
  const fetchPhongChieu = () => {
    axios.get('/api/phongchieu')
      .then(res => setPhongList(res.data))
      .catch(err => console.error('Lỗi khi tải phòng chiếu:', err));
  };

  // Lấy danh sách phim để chọn khi thêm phòng
  const fetchPhim = () => {
    axios.get('/api/phim')
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
      await axios.post('/api/phongchieu', form);
      setForm({ ten_phong: '', phim_id: '', so_ghe: '' });
      fetchPhongChieu();
    } catch (err) {
      console.error('Lỗi khi thêm phòng chiếu:', err);
      alert('Không thể thêm phòng chiếu.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quản Lý Phòng Chiếu</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="ten_phong"
          placeholder="Tên phòng"
          value={form.ten_phong}
          onChange={handleChange}
          required
        />
        <select
          name="phim_id"
          value={form.phim_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn phim chiếu --</option>
          {phimList.map(phim => (
            <option key={phim.phim_id} value={phim.phim_id}>
              {phim.ten_phim}
            </option>
          ))}
        </select>
        <input
          name="so_ghe"
          type="number"
          placeholder="Số ghế"
          value={form.so_ghe}
          onChange={handleChange}
          required
        />
        <button type="submit">Thêm phòng chiếu</button>
      </form>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên phòng</th>
            <th>Phim</th>
            <th>Số ghế</th>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuanLyPhongChieu;
