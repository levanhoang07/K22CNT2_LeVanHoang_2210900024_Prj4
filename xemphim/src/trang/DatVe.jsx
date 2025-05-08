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
  { id: 8, ten: 'Lật Mặt 7' },
  { id: 9, ten: 'Trạng Tí' },
  { id: 10, ten: 'Avatar 2' },
];

export default function DatVe() {
  const { id } = useParams();
  const phim = danhSachPhim.find(p => p.id === parseInt(id));

  const [rap, setRap] = useState('');
  const [suatChieu, setSuatChieu] = useState('');
  const [gheDaChon, setGheDaChon] = useState([]);

  if (!phim) {
    return <p>Không tìm thấy phim.</p>;
  }

  // Ghế của từng hàng
  const gheList = [
    ['A1', 'A2', 'A3', 'A4'],
    ['B1', 'B2', 'B3', 'B4', 'B5'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'],
    ['E1', 'E2', 'E3', 'E4', 'E5' , 'E6', 'E7', 'E8'],
    ['F1', 'F2', 'F3', 'F4'],
  ];

  const handleChonGhe = (ghe) => {
    if (gheDaChon.includes(ghe)) {
      setGheDaChon(gheDaChon.filter(item => item !== ghe)); // Bỏ chọn ghế
    } else {
      setGheDaChon([...gheDaChon, ghe]); // Chọn ghế
    }
  };

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

      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
  <div style={{ marginBottom: '10px', fontSize: '20px', fontWeight: 'bold' }}>Màn Hình</div>
  <div style={{ width: '25%', height: '20px', backgroundColor: '#ccc', margin: '0 auto' }}></div>
</div>


      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
</div>

<div style={{ marginBottom: '10px' }}>
  <label>💺 Chọn ghế:&nbsp;</label>
  <div style={{ textAlign: 'center' }}>
    {gheList.map((hang, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        {hang.map((ghe, i) => (
          <button
            key={ghe}
            onClick={() => handleChonGhe(ghe)}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: gheDaChon.includes(ghe) ? 'green' : 'lightgray',
              color: gheDaChon.includes(ghe) ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {ghe}
          </button>
        ))}
        
        {index === 5 && (
          <div style={{ marginLeft: '10px', display: 'inline-block', fontSize: '16px', color: 'brown' }}> Lối vào🚪</div>
        )}
      </div>
    ))}
  </div>
</div>


      <div style={{ marginTop: '20px' }}>
        {rap && suatChieu && gheDaChon.length > 0 ? (
          <Link
            to={`/giove?phim=${phim.id}&rap=${rap}&suat=${suatChieu}&ghe=${gheDaChon.join(',')}`}
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
