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

  const fetchSuatChieu = () => {
    axios.get('/api/suatchieu')
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
      await axios.post('/api/suatchieu', form);
      setForm({ phim_id: '', phong_id: '', ngay_chieu: '', gio_bat_dau: '', gia_ve: '' });
      fetchSuatChieu();
    } catch (err) {
      console.error('Lỗi khi thêm suất chiếu:', err);
      alert('Không thể thêm suất chiếu.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quản Lý Suất Chiếu</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
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
        <button type="submit">Thêm suất chiếu</button>
      </form>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Phim</th>
            <th>Phòng</th>
            <th>Ngày chiếu</th>
            <th>Giờ bắt đầu</th>
            <th>Giá vé</th>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuanLySuatChieu;
