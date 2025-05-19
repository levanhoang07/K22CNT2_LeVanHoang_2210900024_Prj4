import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function GioVe() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const id = parseInt(query.get('phim'));
  const rap = query.get('rap');
  const suat = query.get('suat');
  const ghe = query.get('ghe');

  const [phim, setPhim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/phim') // API trả về danh sách phim
      .then(response => {
        const danhSachPhim = response.data;
        const phimTimThay = danhSachPhim.find((p) => p.id === id);
        setPhim(phimTimThay);
        setLoading(false);
      })
      .catch(error => {
        console.error('Lỗi khi tải danh sách phim:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  if (!phim || !rap || !suat || !ghe) {
    return <p style={{ color: 'red', fontWeight: 'bold' }}>❌ Thiếu thông tin vé. Vui lòng đặt lại.</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎟️ Giỏ Vé</h1>
      <ul style={styles.list}>
        <li><strong>🎬 Phim:</strong> {phim.ten}</li>
        <li><strong>🏢 Rạp:</strong> {rap}</li>
        <li><strong>🕓 Suất chiếu:</strong> {suat}</li>
        <li><strong>💺 Ghế:</strong> {ghe}</li>
      </ul>
      <p style={styles.success}>✅ Vé của bạn đã được ghi nhận. Vui lòng đến rạp trước 15 phút.</p>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f0f8ff',
    padding: '20px',
    maxWidth: '500px',
    margin: '30px auto',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    color: '#2c3e50',
    textAlign: 'center',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    lineHeight: '1.8em',
    fontSize: '16px',
  },
  success: {
    color: 'green',
    marginTop: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
  }
};
