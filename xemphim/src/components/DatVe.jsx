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

  const handleXacNhanDatVe = async () => {
    try {
      const bookingData = {
        phimId: id,
        rap,
        suatChieu,
        gheDaChon,
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
      setRap('');
      setSuatChieu('');
      setGheDaChon([]);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <div className="dv-loading">
        <div className="dv-spinner"></div>
        <p>Đang tải danh sách phim...</p>
      </div>
    );
  if (error)
    return (
      <div className="dv-error">
        <p>Lỗi: {error}</p>
        <Link to="/" className="dv-btn dv-btn-home">Trang chủ</Link>
      </div>
    );

  const phim = danhSachPhim.find(p => p.id === parseInt(id));
  if (!phim) {
    return (
      <div className="dv-error">
        <p>Không tìm thấy phim.</p>
        <Link to="/" className="dv-btn dv-btn-home">Trang chủ</Link>
      </div>
    );
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
    <div className="dv-bg">
      <div className="dv-container">
        <div className="dv-card">
          <div className="dv-movie-image">
            <img src={phim.anh} alt={phim.ten} />
          </div>
          <div className="dv-content">
            <h1 className="dv-title">Đặt Vé: <span>{phim.ten}</span></h1>
            {successMessage && <div className="dv-success">{successMessage}</div>}

            <div className="dv-row">
              <label>🎬 Chọn rạp:</label>
              <select value={rap} onChange={(e) => setRap(e.target.value)}>
                <option value="">--Chọn rạp--</option>
                <option value="Rạp 1">Rạp 1</option>
                <option value="Rạp 2">Rạp 2</option>
              </select>
            </div>

            <div className="dv-row">
              <label>🕓 Chọn suất chiếu:</label>
              <select value={suatChieu} onChange={(e) => setSuatChieu(e.target.value)}>
                <option value="">--Chọn suất--</option>
                <option value="10:00">10:00</option>
                <option value="14:00">14:00</option>
                <option value="18:00">18:00</option>
              </select>
            </div>

            <div className="dv-ghe">
              <div className="dv-man-hinh">Màn Hình</div>
              <div className="dv-man-hinh-bar"></div>
              <label>💺 Chọn ghế:</label>
              <div className="dv-ghe-list">
                {gheList.map((hang, index) => (
                  <div key={index} className="dv-ghe-row">
                    {hang.map((ghe) => (
                      <button
                        key={ghe}
                        onClick={() => handleChonGhe(ghe)}
                        className={`dv-ghe-btn${gheDaChon.includes(ghe) ? ' selected' : ''}`}
                        type="button"
                      >
                        {ghe}
                      </button>
                    ))}
                    {index === 5 && (
                      <span className="dv-loi-vao">Lối vào🚪</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="dv-btn-group">
              <Link to="/" className="dv-btn dv-btn-home"> Quay lại Trang chủ</Link>
              {rap && suatChieu && gheDaChon.length > 0 ? (
                <button
                  onClick={handleXacNhanDatVe}
                  className="dv-btn dv-btn-xacnhan"
                >
                  🎟️ Xác nhận đặt vé
                </button>
              ) : (
                <span className="dv-warning">Vui lòng chọn đầy đủ rạp, suất chiếu và ghế.</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .dv-bg {
          background: rgb(40,38,38);
          min-height: 100vh;
          padding: 0;
        }
        .dv-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 16px 60px 16px;
        }
        .dv-card {
          display: flex;
          flex-direction: row;
          gap: 40px;
          background: rgba(28,28,32,0.98);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(40,40,60,0.14), 0 1.5px 0 #e53935 inset;
          overflow: hidden;
          align-items: flex-start;
        }
        .dv-movie-image {
          flex-shrink: 0;
          width: 300px;
          min-width: 200px;
          max-width: 340px;
          height: 420px;
          background: #232733;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 24px 0 0 24px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(40,40,60,0.10);
        }
        .dv-movie-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px 0 0 24px;
        }
        .dv-content {
          flex: 1;
          padding: 38px 18px 38px 0;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .dv-title {
          font-size: 2rem;
          font-weight: 700;
          color: #e53935;
          margin-bottom: 18px;
          font-family: 'Playfair Display', serif;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 16px #e53935, 0 1px 0 #fff;
        }
        .dv-title span {
          color: #fff;
          font-size: 1.2em;
        }
        .dv-row {
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dv-row label {
          min-width: 120px;
          color: #ffb199;
          font-weight: 600;
        }
        .dv-row select {
          padding: 8px 14px;
          border-radius: 8px;
          border: 1.5px solid #e53935;
          background: #232733;
          color: #fff;
          font-size: 1rem;
          outline: none;
        }
        .dv-row select:focus {
          border-color: #ffb199;
        }
        .dv-ghe {
          margin-bottom: 18px;
        }
        .dv-man-hinh {
          font-size: 1.1rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 6px;
        }
        .dv-man-hinh-bar {
          width: 30%;
          height: 20px;
          background-color: #ccc;
          margin: 0 auto 12px auto;
          border-radius: 8px;
        }
        .dv-ghe-list {
          text-align: center;
        }
        .dv-ghe-row {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dv-ghe-btn {
          margin: 5px;
          padding: 10px 0;
          width: 44px;
          background-color: #444857;
          color: #fff;
          border: 1.5px solid #bdbdbd;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.2s, color 0.2s, border 0.2s;
        }
        .dv-ghe-btn.selected {
          background: linear-gradient(90deg, #e53935 60%, #ffb199 100%);
          color: #fff;
          border: 1.5px solid #e53935;
        }
        .dv-ghe-btn:hover {
          background: #e57373;
          color: #fff;
        }
        .dv-loi-vao {
          margin-left: 10px;
          display: inline-block;
          font-size: 16px;
          color: brown;
        }
        .dv-btn-group {
          display: flex;
          gap: 14px;
          margin-top: 18px;
        }
        .dv-btn {
          display: inline-block;
          padding: 10px 22px;
          background: linear-gradient(90deg, #e53935 60%, #ffb199 100%);
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(229,57,53,0.13);
          letter-spacing: 0.5px;
          transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
          border: none;
          cursor: pointer;
        }
        .dv-btn-home {
          background: linear-gradient(90deg, #232733 60%, #555 100%);
          color: #fff;
          border: 1.5px solid #e53935;
        }
        .dv-btn-home:hover {
          background: #181c24;
          color: #e53935;
        }
        .dv-btn-xacnhan {
          background: linear-gradient(90deg, #43e97b 60%, #38f9d7 100%);
          color: #232733;
        }
        .dv-btn-xacnhan:hover {
          background: linear-gradient(90deg, #11998e 60%, #38f9d7 100%);
          color: #fff;
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 24px rgba(67,233,123,0.18);
        }
        .dv-warning {
          color: #e57373;
          font-size: 1rem;
          align-self: center;
          margin-top: 8px;
        }
        .dv-success {
          color: #43e97b;
          background: rgba(67,233,123,0.07);
          border-radius: 6px;
          padding: 7px 12px;
          margin-bottom: 12px;
          font-weight: 500;
        }
        .dv-loading, .dv-error {
          text-align: center;
          padding: 60px 0;
          color: #e53935;
          font-size: 1.2rem;
        }
        .dv-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(229,57,53, 0.2);
          border-top: 3px solid #e53935;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        @media (max-width: 900px) {
          .dv-card {
            flex-direction: column;
            gap: 0;
            border-radius: 18px;
          }
          .dv-movie-image {
            width: 100%;
            max-width: 100vw;
            height: 220px;
            border-radius: 18px 18px 0 0;
          }
          .dv-movie-image img {
            border-radius: 18px 18px 0 0;
          }
          .dv-content {
            padding: 24px 12px 24px 12px;
          }
          .dv-btn-group {
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}