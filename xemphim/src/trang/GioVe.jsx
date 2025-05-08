import React from 'react';
import { useLocation } from 'react-router-dom';

const danhSachPhim = [
  { id: 1, ten: 'Mắt Biếc' },
  { id: 2, ten: 'Hai Phượng' },
  { id: 3, ten: 'Em Chưa 18' },
  { id: 4, ten: 'Bố Già' },
  { id: 5, ten: 'Tiệc Trăng Máu' },
  { id: 6, ten: 'Ròm' },
  { id: 7, ten: 'Tháng Năm Rực Rỡ' },
  { id: 8, ten: 'Lật Mặt 77' },
  { id: 9, ten: 'Trạng Tí' },
  { id: 10, ten: 'Avatar 22' },
];

export default function GioVe() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const id = parseInt(query.get('phim'));
  const rap = query.get('rap');
  const suat = query.get('suat');
  const ghe = query.get('ghe');

  const phim = danhSachPhim.find((p) => p.id === id);

  if (!phim || !rap || !suat || !ghe) {
    return <p style={{ color: 'red' }}>Thiếu thông tin vé. Vui lòng đặt lại.</p>;
  }

  return (
    <div>
      <h1>🎟️ Giỏ Vé</h1>
      <ul>
        <li><strong>🎬 Phim:</strong> {phim.ten}</li>
        <li><strong>🏢 Rạp:</strong> {rap}</li>
        <li><strong>🕓 Suất chiếu:</strong> {suat}</li>
        <li><strong>💺 Ghế:</strong> {ghe}</li>
      </ul>
      <p style={{ color: 'green' }}>✅ Vé của bạn đã được ghi nhận. Vui lòng đến rạp trước 15 phút.</p>
    </div>
  );
}

