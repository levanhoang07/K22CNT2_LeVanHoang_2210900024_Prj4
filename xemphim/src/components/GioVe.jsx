import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "./context/AuthContext";

export default function GioVe() {
  const { user } = useContext(AuthContext);
  const nguoiDungId = user?.nguoidung_id || user?.id;

  const [veList, setVeList] = useState([]);
  const [phimList, setPhimList] = useState([]);
  const [suatChieuList, setSuatChieuList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nguoiDungId) return;
    Promise.all([
      axios.get(`http://localhost:3000/api/vedat?nguoidung_id=${nguoiDungId}`),
      axios.get('http://localhost:3000/api/phim'),
      axios.get('http://localhost:3000/api/suatchieu')
    ])
      .then(([veRes, phimRes, suatRes]) => {
        setVeList(veRes.data);
        setPhimList(phimRes.data);
        setSuatChieuList(suatRes.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [nguoiDungId]);

  if (!nguoiDungId) return <div className="gio-empty">Vui lòng đăng nhập để xem giỏ vé!</div>;
  if (loading) return <div className="gio-loading">Đang tải vé...</div>;
  if (!veList.length) return <div className="gio-empty">Bạn chưa có vé nào trong giỏ!</div>;

  return (
    <div className="gio-container">
      <h2 className="gio-title">🎟️ Giỏ Vé của bạn</h2>
      <ul className="gio-list">
        {veList.map(ve => {
          const suat = suatChieuList.find(s => s.suat_chieu_id === ve.suat_chieu_id);
          const phim = suat ? phimList.find(p => p.phim_id === suat.phim_id || p.id === suat.phim_id) : null;
          const gheStr = ve.chi_tiet?.map(g => g.so_ghe).join(', ');
          const tongTien = ve.chi_tiet?.reduce((sum, g) => sum + Number(g.gia_ve || 0), 0);

          return (
            <li key={ve.ve_id} className="gio-item">
              <div className="gio-row">
                <span className="gio-label">🎬 Phim:</span>
                <span className="gio-value">{phim ? (phim.ten || phim.ten_phim) : ve.phim_id}</span>
              </div>
              <div className="gio-row">
                <span className="gio-label">🕒 Suất chiếu:</span>
                <span className="gio-value">{suat ? `${suat.ngay_chieu} ${suat.gio_bat_dau}` : ve.suat_chieu_id}</span>
              </div>
              <div className="gio-row">
                <span className="gio-label">💺 Ghế:</span>
                <span className="gio-value">{gheStr}</span>
              </div>
              <div className="gio-row">
                <span className="gio-label">💰 Tổng tiền:</span>
                <span className="gio-value gio-money">{tongTien?.toLocaleString()} đ</span>
              </div>
            </li>
          );
        })}
      </ul>
      <style>{`
        .gio-container {
          max-width: 520px;
          margin: 40px auto;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(229,57,53,0.10);
          padding: 32px 18px 28px 18px;
        }
        .gio-title {
          color: #e53935;
          font-size: 1.7rem;
          margin-bottom: 28px;
          text-align: center;
          font-family: 'Playfair Display', serif;
          letter-spacing: 0.5px;
        }
        .gio-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .gio-item {
          background: #f9f9fb;
          margin-bottom: 18px;
          padding: 18px 18px 12px 18px;
          border-radius: 12px;
          font-size: 1.08rem;
          box-shadow: 0 1px 8px rgba(229,57,53,0.06);
          border-left: 5px solid #e53935;
          transition: box-shadow 0.2s;
        }
        .gio-item:last-child {
          margin-bottom: 0;
        }
        .gio-row {
          display: flex;
          align-items: center;
          margin-bottom: 7px;
        }
        .gio-label {
          min-width: 110px;
          color: #e53935;
          font-weight: 600;
          font-size: 1.02rem;
          margin-right: 8px;
          display: inline-block;
        }
        .gio-value {
          color: #222;
          font-weight: 500;
          font-size: 1.04rem;
        }
        .gio-money {
          color: #388e3c;
          font-weight: 700;
          font-size: 1.08rem;
        }
        .gio-loading, .gio-empty {
          text-align: center;
          color: #e53935;
          font-size: 1.2rem;
          margin-top: 60px;
        }
        @media (max-width: 600px) {
          .gio-container {
            padding: 18px 4px 18px 4px;
          }
          .gio-item {
            padding: 12px 8px 8px 8px;
          }
          .gio-label {
            min-width: 80px;
            font-size: 0.98rem;
          }
          .gio-value {
            font-size: 0.98rem;
          }
        }
      `}</style>
    </div>
  );
}