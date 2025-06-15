import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext"; 

export default function DatVe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 
  const nguoiDungId = user?.nguoidung_id || user?.id; 

  const [danhSachPhim, setDanhSachPhim] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [rap, setRap] = useState('');
  const [suatChieu, setSuatChieu] = useState('');
  const [gheDaChon, setGheDaChon] = useState([]);
  const [danhSachGhe, setDanhSachGhe] = useState([]); // mảng 2 chiều [{so_ghe, ghe_id, loai_ghe, gia_ve, phong_id}]
  const [danhSachSuatChieu, setDanhSachSuatChieu] = useState([]);

  // Lấy danh sách phim
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

  // Lấy danh sách ghế và suất chiếu
  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/ghe')
      .then(res => res.json())
      .then(data => {
        // Nếu API trả về mảng 1 chiều, nhóm lại thành mảng 2 chiều theo hàng (A, B, C...)
        if (Array.isArray(data) && data.length > 0 && !Array.isArray(data[0])) {
          const grouped = {};
          data.forEach(ghe => {
            if (!grouped[ghe.so_ghe[0]]) grouped[ghe.so_ghe[0]] = [];
            grouped[ghe.so_ghe[0]].push(ghe);
          });
          setDanhSachGhe(Object.values(grouped));
        } else {
          setDanhSachGhe(data);
        }
      });
    fetch('http://127.0.0.1:3000/api/suatchieu')
      .then(res => res.json())
      .then(data => setDanhSachSuatChieu(data));
  }, []);

  // Chọn/bỏ chọn ghế
  const handleChonGhe = (ghe) => {
    if (gheDaChon.includes(ghe.so_ghe)) {
      setGheDaChon(gheDaChon.filter(item => item !== ghe.so_ghe));
    } else {
      setGheDaChon([...gheDaChon, ghe.so_ghe]);
    }
  };

  // Tính tổng tiền
  const tinhTongTien = () => {
    let tong = 0;
    danhSachGhe.forEach(hang => {
      hang.forEach(ghe => {
        if (gheDaChon.includes(ghe.so_ghe)) tong += Number(ghe.gia_ve);
      });
    });
    return tong;
  };

  // Đặt vé
  const handleXacNhanDatVe = async () => {
    try {
      // Tìm suat_chieu_id từ giờ chiếu và phim
      const suatChieuObj = danhSachSuatChieu.find(
        s => (s.gio_bat_dau === suatChieu || s.gio === suatChieu) && s.phim_id === parseInt(id)
      );
      const suat_chieu_id = suatChieuObj ? (suatChieuObj.suat_chieu_id || suatChieuObj.id) : null;

      // Tìm danh sách ghe_id từ tên ghế
      const gheIdDaChon = [];
      danhSachGhe.forEach(hang => {
        hang.forEach(ghe => {
          if (gheDaChon.includes(ghe.so_ghe)) gheIdDaChon.push(ghe.ghe_id);
        });
      });

      if (!suat_chieu_id || gheIdDaChon.length === 0) {
        setError('Vui lòng chọn đúng suất chiếu và ghế.');
        return;
      }

      // Gửi 1 lần tất cả ghế lên server
      const veData = {
        suatChieuId: suat_chieu_id,
        gheDaChon: gheIdDaChon, // là mảng các ghe_id
        nguoiDungId: nguoiDungId // Sử dụng id của user đang đăng nhập
      };

      const response = await fetch('http://127.0.0.1:3000/api/vedat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(veData),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error('Lỗi khi lưu vé: ' + errText);
      }

      setSuccessMessage('Đặt vé thành công!');
      setRap('');
      setSuatChieu('');
      setGheDaChon([]);
      // Chuyển sang trang giỏ vé cho user
      setTimeout(() => {
        navigate(
          `/giove?phim=${id}&rap=${encodeURIComponent(rap)}&suat=${encodeURIComponent(suatChieu)}&ghe=${encodeURIComponent(gheDaChon.join(','))}`
        );
      }, 1000); // Đợi 1s cho user thấy thông báo
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDatVe = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để đặt vé!");
      navigate("/dangnhap");
      return;
    }
    handleXacNhanDatVe();
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

  const phim = danhSachPhim.find(p => p.id === parseInt(id) || p.phim_id === parseInt(id));
  if (!phim) {
    return (
      <div className="dv-error">
        <p>Không tìm thấy phim.</p>
        <Link to="/" className="dv-btn dv-btn-home">Trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="dv-bg">
      <div className="dv-container">
        <div className="dv-card">
          <div className="dv-movie-image">
            <img src={phim.anh} alt={phim.ten || phim.ten_phim} />
          </div>
          <div className="dv-content">
            <h1 className="dv-title">Đặt Vé: <span>{phim.ten || phim.ten_phim}</span></h1>
            {successMessage && <div className="dv-success">{successMessage}</div>}

            <div className="dv-row">
              <label>Chọn rạp:</label>
              <select value={rap} onChange={(e) => setRap(e.target.value)}>
                <option value="">--Chọn rạp--</option>
                <option value="Rạp 1">Rạp 1</option>
                <option value="Rạp 2">Rạp 2</option>
              </select>
            </div>

           <div className="dv-row">
            <label>Chọn suất chiếu:</label>
            <select value={suatChieu} onChange={(e) => setSuatChieu(e.target.value)}>
              <option value="">--Chọn suất--</option>
              {danhSachSuatChieu
                .filter(s => s.phim_id === parseInt(id))
                .map(s => {
                  const gio = s.gio_bat_dau || s.gio || "";
                  const gioHienThi = gio.slice(0, 5); // Lấy HH:mm
                  return (
                    <option key={s.suat_chieu_id || s.id} value={gio}>
                      {gioHienThi}
                    </option>
                  );
                })}
            </select>
          </div>

            <div className="dv-ghe">
              <div className="dv-man-hinh">Màn Hình</div>
              <div className="dv-man-hinh-bar"></div>
              <label>Chọn ghế:</label>
              <div className="dv-ghe-so-do">
                {danhSachGhe.map((hang, index) => (
                  <div key={index} className="dv-ghe-row">
                    {hang.map((ghe) => (
                      <button
                        key={ghe.so_ghe}
                        onClick={() => handleChonGhe(ghe)}
                        className={`dv-ghe-btn${gheDaChon.includes(ghe.so_ghe) ? ' selected' : ''} ${ghe.loai_ghe === 'VIP' ? ' vip' : ''}`}
                        type="button"
                        title={`Loại: ${ghe.loai_ghe}`}
                      >
                        {ghe.so_ghe}
                        <div style={{fontSize: '0.8em'}}>{ghe.loai_ghe}</div>
                      </button>
                    ))}
                    {index === 5 && (
                      <span className="dv-loi-vao">Lối vào🚪</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="dv-tong-tien">
              <b>Ghế đã chọn:</b> {gheDaChon.join(', ') || 'Chưa chọn'}
              <br />
              <b>Tổng tiền:</b> <span style={{color: '#e53935', fontWeight: 700, fontSize: '1.2em'}}>{tinhTongTien().toLocaleString()} đ</span>
            </div>

            <div className="dv-btn-group">
              <Link to="/" className="dv-btn dv-btn-home"> Quay lại Trang chủ</Link>
              {rap && suatChieu && gheDaChon.length > 0 ? (
                <button
                  onClick={handleDatVe}
                  className="dv-btn dv-btn-xacnhan"
                >
                  Xác nhận đặt vé
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
          min-height: 100vh;
          background: linear-gradient(120deg, #f8fafc 0%, #e3e6f3 100%);
          padding: 40px 0;
        }
        .dv-container {
          max-width: 700px;
          margin: 0 auto;
        }
        .dv-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          display: flex;
          padding: 24px;
          gap: 28px;
        }
        .dv-movie-image img {
          width: 180px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
        .dv-content {
          flex: 1;
        }
        .dv-title {
          font-size: 1.5rem;
          color: #e53935;
          margin-bottom: 16px;
        }
        .dv-row {
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dv-row label {
          min-width: 120px;
          font-weight: 500;
        }
        select {
          padding: 7px 12px;
          border-radius: 6px;
          border: 1px solid #bbb;
          font-size: 1rem;
        }
        .dv-ghe {
          margin: 18px 0 10px 0;
          text-align: center;
        }
        .dv-man-hinh {
          text-align: center;
          font-weight: 700;
          margin-bottom: 2px;
          font-size: 1.1em;
          letter-spacing: 1px;
        }
        .dv-man-hinh-bar {
          width: 60%;
          min-width: 220px;
          max-width: 400px;
          margin: 0 auto 18px auto;
          height: 22px;
          background: #fff;
          border-radius: 0 0 120px 120px / 0 0 60px 60px;
          /* Vòng cung rõ nét phía dưới */
          box-shadow:
            0 8px 32px 0 #e5393533,
            0 2px 18px 0 #fff8,
            0 18px 36px 0 rgba(213, 7, 7, 0.7) inset;
          position: relative;
          overflow: hidden;
        }
        .dv-man-hinh-bar::after {
          content: "";
          display: block;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 70%;
          height: 80%;
          background: radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.0) 80%);
          pointer-events: none;
        }
        .dv-ghe-so-do {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin: 0 auto;
          width: fit-content;
          min-width: 220px;
          max-width: 420px;
        }
        .dv-ghe-row {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 2px;
        }
        .dv-ghe-btn {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          border: 1.5px solid #bbb;
          background: #f4f4f4;
          color: #222;
          font-weight: 600;
          font-size: 1.1em;
          cursor: pointer;
          transition: background 0.2s, border 0.2s, color 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 1px 4px #e5393533;
        }
        .dv-ghe-btn.vip {
          border: 2px solid #e53935;
          background: #ffeaea;
          color: #e53935;
        }
        .dv-ghe-btn.selected {
          background: #e53935;
          color: #fff;
          border: 2px solid #e53935;
        }
        .dv-ghe-btn.selected.vip {
          background: #b71c1c;
          color: #fff;
        }
        .dv-loi-vao {
          margin-left: 18px;
          font-size: 1.1em;
          color: #888;
          align-self: center;
        }
        .dv-tong-tien {
          margin: 18px 0 8px 0;
          font-size: 1.1em;
        }
        .dv-btn-group {
          margin-top: 18px;
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .dv-btn {
          padding: 10px 22px;
          border-radius: 8px;
          border: none;
          background: #e53935;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
          text-decoration: none;
        }
        .dv-btn-home {
          background: #888;
        }
        .dv-btn-xacnhan {
          background: #e53935;
        }
        .dv-btn:disabled, .dv-btn[disabled] {
          background: #ccc;
          cursor: not-allowed;
        }
        .dv-warning {
          color: #e53935;
          font-weight: 500;
        }
        .dv-success {
          background: #e0ffe0;
          color: #388e3c;
          padding: 8px 14px;
          border-radius: 6px;
          margin-bottom: 10px;
          font-weight: 600;
        }
        @media (max-width: 900px) {
          .dv-card { flex-direction: column; align-items: center; }
          .dv-movie-image img { width: 120px; }
        }
        @media (max-width: 600px) {
          .dv-ghe-so-do {
            min-width: 0;
            max-width: 100vw;
          }
          .dv-man-hinh-bar {
            width: 90%;
            min-width: 0;
          }
          .dv-ghe-btn {
            width: 34px;
            height: 34px;
            font-size: 0.95em;
          }
        }
      `}</style>
    </div>
  );
}