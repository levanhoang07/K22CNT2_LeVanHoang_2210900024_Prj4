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

  const fetchGhe = () => {
    axios.get('/api/ghe')
      .then(res => setGheList(res.data))
      .catch(err => console.error('Lỗi khi tải danh sách ghế:', err));
  };

  const fetchPhong = () => {
    axios.get('/api/phongchieu')
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
      await axios.post('/api/ghe', form);
      setForm({ phong_id: '', so_ghe: '', loai_ghe: '' });
      fetchGhe();
    } catch (err) {
      console.error('Lỗi khi thêm ghế:', err);
      alert('Không thể thêm ghế.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quản Lý Ghế</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <select
          name="phong_id"
          value={form.phong_id}
          onChange={handleChange}
          required
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
        />
        <select
          name="loai_ghe"
          value={form.loai_ghe}
          onChange={handleChange}
          required
        >
          <option value="">-- Loại ghế --</option>
          <option value="Thuong">Thường</option>
          <option value="VIP">VIP</option>
        </select>
        <button type="submit">Thêm ghế</button>
      </form>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Phòng</th>
            <th>Số ghế</th>
            <th>Loại ghế</th>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuanLyGhe;
