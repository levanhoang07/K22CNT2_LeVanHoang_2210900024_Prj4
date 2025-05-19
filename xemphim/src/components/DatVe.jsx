import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DatVe() {
  const { id } = useParams();

  const [danhSachPhim, setDanhSachPhim] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [rap, setRap] = useState('');
  const [suatChieu, setSuatChieu] = useState('');
  const [gheDaChon, setGheDaChon] = useState([]);

  // Lấy danh sách phim từ API khi component mount
  useEffect(() => {
    async function fetchPhim() {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/phim');
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu phim');
        }
        const data = await response.json();
        setDanhSachPhim(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPhim();
  }, []);

  // Hàm lưu vé vào cơ sở dữ liệu
  const handleXacNhanDatVe = async () => {
    try {
      const bookingData = {
        phimId: id,
        rap,
        suatChieu,
        gheDaChon,
        // userId: 'USER_ID_HERE', // Thêm userId nếu có hệ thống đăng nhập
      };

      const response = await fetch('http://127.0.0.1:3000/api/vedat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Lỗi khi lưu vé');
      }

      const result = await response.json();
      setSuccessMessage('Đặt vé thành công! Mã đặt vé: ' + result.maDatVe);
      // Reset form
      setRap('');
      setSuatChieu('');
      setGheDaChon([]);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Đang tải danh sách phim...</p>;
  if (error) return <p style={{ color: 'red' }}>Lỗi: {error}</p>;

  const phim = danhSachPhim.find(p => p.id === parseInt(id));
  if (!phim) {
    return <p>Không tìm thấy phim.</p>;
  }

  const gheList = [
    ['A1', 'A2', 'A3', 'A4'],
    ['B1', 'B2', 'B3', 'B4', 'B5'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
    ['F1', 'F2', 'F3', 'F4'],
  ];

  const handleChonGhe = (ghe) => {
    if (gheDaChon.includes(ghe)) {
      setGheDaChon(gheDaChon.filter(item => item !== ghe));
    } else {
      setGheDaChon([...gheDaChon, ghe]);
    }
  };

  return (
    <div>
      <h1>Đặt Vé: <span style={{ color: 'blue' }}>{phim.ten}</span></h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <div style={{ marginBottom: '10px' }}>
        <label>🎬 Chọn rạp: </label>
        <select value={rap} onChange={(e) => setRap(e.target.value)}>
          <option value="">--Chọn rạp--</option>
          <option value="Rạp 1">Rạp 1</option>
          <option value="Rạp 2">Rạp 2</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>🕓 Chọn suất chiếu: </label>
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

      <div style={{ marginBottom: '10px' }}>
        <label>💺 Chọn ghế: </label>
        <div style={{ textAlign: 'center' }}>
          {gheList.map((hang, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              {hang.map((ghe) => (
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
                <div style={{ marginLeft: '10px', display: 'inline-block', fontSize: '16px', color: 'brown' }}>
                  Lối vào🚪
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        {rap && suatChieu && gheDaChon.length > 0 ? (
          <button
            onClick={handleXacNhanDatVe}
            style={{
              textDecoration: 'none',
              color: 'white',
              background: 'green',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            🎟️ Xác nhận đặt vé
          </button>
        ) : (
          <p style={{ color: 'red' }}>Vui lòng chọn đầy đủ rạp, suất chiếu và ghế.</p>
        )}
      </div>
    </div>
  );
}