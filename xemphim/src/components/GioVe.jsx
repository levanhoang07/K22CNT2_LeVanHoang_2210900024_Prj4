import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
    axios.get('http://localhost:3000/api/vedat')
      .then(response => {
        const danhSachPhim = response.data;
        const phimTimThay = danhSachPhim.find((p) => p.id === id);
        setPhim(phimTimThay);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="gio-loading">
        <div className="gio-spinner"></div>
        <p>Đang tải dữ liệu...</p>
        <style>{`
          .gio-loading {
            text-align: center;
            padding: 60px 0;
            color: #e53935;
            font-size: 1.2rem;
          }
          .gio-spinner {
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
        `}</style>
      </div>
    );

  if (!phim || !rap || !suat || !ghe) {
    return (
      <div className="gio-error">
        <h2>❌ Thiếu thông tin vé. Vui lòng đặt lại.</h2>
        <Link to="/" className="gio-btn gio-btn-home"> Quay lại Trang chủ</Link>
        <style>{`
          .gio-error {
            text-align: center;
            padding: 60px 0;
            color: #e53935;
          }
          .gio-btn {
            display: inline-block;
            padding: 10px 22px;
            background: linear-gradient(90deg, #232733 60%, #555 100%);
            color: #fff;
            border: 1.5px solid #e53935;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1rem;
            margin-top: 18px;
            transition: background 0.3s, color 0.2s;
          }
          .gio-btn:hover {
            background: #181c24;
            color: #e53935;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="gio-bg">
      <div className="gio-container">
        <div className="gio-card">
          <div className="gio-movie-image">
            <img src={phim.anh} alt={phim.ten} />
          </div>
          <div className="gio-content">
            <h1 className="gio-title">🎟️ Giỏ Vé</h1>
            <ul className="gio-list">
              <li><span className="gio-label">🎬 Phim:</span> {phim.ten}</li>
              <li><span className="gio-label">🏢 Rạp:</span> {rap}</li>
              <li><span className="gio-label">🕓 Suất chiếu:</span> {suat}</li>
              <li><span className="gio-label">💺 Ghế:</span> {ghe}</li>
            </ul>
            <p className="gio-success">✅ Vé của bạn đã được ghi nhận. Vui lòng đến rạp trước 15 phút.</p>
            <div className="gio-btn-group">
              <Link to="/" className="gio-btn gio-btn-home">Trang chủ</Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .gio-bg {
          background: rgb(40,38,38);
          min-height: 100vh;
          padding: 0;
        }
        .gio-container {
          max-width: 700px;
          margin: 0 auto;
          padding: 48px 16px 60px 16px;
        }
        .gio-card {
          display: flex;
          flex-direction: row;
          gap: 32px;
          background: rgba(28,28,32,0.98);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(40,40,60,0.14), 0 1.5px 0 #e53935 inset;
          overflow: hidden;
          align-items: flex-start;
        }
        .gio-movie-image {
          flex-shrink: 0;
          width: 180px;
          min-width: 120px;
          max-width: 180px;
          height: 260px;
          background: #232733;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 24px 0 0 24px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(40,40,60,0.10);
        }
        .gio-movie-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px 0 0 24px;
        }
        .gio-content {
          flex: 1;
          padding: 32px 18px 32px 0;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .gio-title {
          font-size: 1.7rem;
          font-weight: 700;
          color: #e53935;
          margin-bottom: 18px;
          font-family: 'Playfair Display', serif;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 16px #e53935, 0 1px 0 #fff;
        }
        .gio-list {
          list-style-type: none;
          padding: 0;
          margin: 0 0 18px 0;
          font-size: 1.08rem;
          color: #e0e0e0;
        }
        .gio-list li {
          margin-bottom: 10px;
        }
        .gio-label {
          color: #ffb199;
          font-weight: 600;
          margin-right: 6px;
        }
        .gio-success {
          color: #43e97b;
          background: rgba(67,233,123,0.07);
          border-radius: 6px;
          padding: 7px 12px;
          margin-bottom: 18px;
          font-weight: 500;
        }
        .gio-btn-group {
          margin-top: 10px;
        }
        .gio-btn {
          display: inline-block;
          padding: 10px 22px;
          background: linear-gradient(90deg, #232733 60%, #555 100%);
          color: #fff;
          border: 1.5px solid #e53935;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          transition: background 0.3s, color 0.2s;
        }
        .gio-btn:hover {
          background: #181c24;
          color: #e53935;
        }
        @media (max-width: 700px) {
          .gio-card {
            flex-direction: column;
            gap: 0;
            border-radius: 18px;
          }
          .gio-movie-image {
            width: 100%;
            max-width: 100vw;
            height: 180px;
            border-radius: 18px 18px 0 0;
          }
          .gio-movie-image img {
            border-radius: 18px 18px 0 0;
          }
          .gio-content {
            padding: 24px 12px 24px 12px;
          }
        }
      `}</style>
    </div>
  );
}