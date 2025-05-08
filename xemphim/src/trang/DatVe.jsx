import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const danhSachPhim = [
  { id: 1, ten: 'Mắt Biếc' },
  { id: 2, ten: 'Hai Phượng' },
  { id: 3, ten: 'Em Chưa 18' },
  { id: 4, ten: 'Bố Già' },
  { id: 5, ten: 'Tiệc Trăng Máu' },
  { id: 6, ten: 'Ròm' },
  { id: 7, ten: 'Tháng Năm Rực Rỡ' },
  { id: 8, ten: 'Lật Mặt: 48h' },
  { id: 9, ten: 'Trạng Tí' },
  { id: 10, ten: 'Song Song' },
];

export default function DatVe() {
  const { id } = useParams();
  const phim = danhSachPhim.find(p => p.id === parseInt(id));

  const [rap, setRap] = useState('');
  const [suatChieu, setSuatChieu] = useState('');
  const [ghe, setGhe] = useState('');

  if (!phim) {
    return <p>Không tìm thấy phim.</p>;
  }

  return (
    <div>
      <h1>Đặt Vé: <span style={{ color: 'blue' }}>{phim.ten}</span></h1>

      <div style={{ marginBottom: '10px' }}>
        <label>🎬 Chọn rạp:&nbsp;</label>
        <select value={rap} onChange={(e) => setRap(e.target.value)}>
          <option value="">--Chọn rạp--</option>
          <option value="Rạp 1">Rạp 1</option>
          <option value="Rạp 2">Rạp 2</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>🕓 Chọn suất chiếu:&nbsp;</label>
        <select value={suatChieu} onChange={(e) => setSuatChieu(e.target.value)}>
          <option value="">--Chọn suất--</option>
          <option value="10:00">10:00</option>
          <option value="14:00">14:00</option>
          <option value="18:00">18:00</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>💺 Chọn ghế:&nbsp;</label>
        <select value={ghe} onChange={(e) => setGhe(e.target.value)}>
          <option value="">--Chọn ghế--</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        {rap && suatChieu && ghe ? (
          <Link
            to={`/giove?phim=${phim.id}&rap=${rap}&suat=${suatChieu}&ghe=${ghe}`}
            style={{
              textDecoration: 'none',
              color: 'white',
              background: 'green',
              padding: '10px 20px',
              borderRadius: '5px',
            }}
          >
            🎟️ Xác nhận đặt vé
          </Link>
        ) : (
          <p style={{ color: 'red' }}>Vui lòng chọn đầy đủ rạp, suất chiếu và ghế.</p>
        )}
      </div>
    </div>
  );
}
