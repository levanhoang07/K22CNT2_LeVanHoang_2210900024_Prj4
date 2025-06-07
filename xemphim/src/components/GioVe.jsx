import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "./context/AuthContext";
import { getVietQRUrl } from "./getVietQRUrl";

const hinhThucList = ["Momo", "ZaloPay", "Banking"];

export default function GioVe() {
  const { user } = useContext(AuthContext);
  const nguoiDungId = user?.nguoidung_id || user?.id;

  const [veList, setVeList] = useState([]);
  const [phimList, setPhimList] = useState([]);
  const [suatChieuList, setSuatChieuList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Thêm state cho thanh toán
  const [showPay, setShowPay] = useState(null); // ve_id đang thanh toán
  const [hinhThucMap, setHinhThucMap] = useState({}); // { [ve_id]: hinhThuc }
  const [payMsg, setPayMsg] = useState("");

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

  // Hàm xử lý thanh toán
  const handlePay = async (ve) => {
    setPayMsg("");
    const hinhThuc = hinhThucMap[ve.ve_id];
    if (!hinhThuc) {
      setPayMsg("Vui lòng chọn hình thức thanh toán!");
      return;
    }
    try {
      // Tổng tiền của vé
      const tongTien = ve.chi_tiet?.reduce((sum, g) => sum + Number(g.gia_ve || 0), 0);
      await axios.post("http://localhost:3000/api/thanhtoan", {
        ve_id: ve.ve_id,
        so_tien: tongTien,
        hinh_thuc: hinhThuc,
        trang_thai: "Chờ xử lý"
      });
      setPayMsg("Thanh toán thành công! Vui lòng chờ xác nhận.");
      setShowPay(null);
      setHinhThucMap(h => ({ ...h, [ve.ve_id]: "" }));
    } catch {
      setPayMsg("Lỗi khi thanh toán!");
    }
  };

  // Hàm tính tổng tiền cho từng vé
  function tinhTongTien(ve) {
    if (!ve.chi_tiet || !Array.isArray(ve.chi_tiet)) return 0;
    return ve.chi_tiet.reduce((sum, ghe) => sum + Number(ghe.gia_ve || 0), 0);
  }

  if (!nguoiDungId) return (
    <div className="gio-empty gio-message">
      <span className="gio-icon">🔒</span>
      <div>
        Vui lòng <a href="/dangnhap" className="gio-link">đăng nhập</a> để xem giỏ vé!
        <style>{`
          .gio-link {
            color: #e53935;
            font-weight: 600;
            text-decoration: underline;
            transition: color 0.2s, text-shadow 0.2s;
            padding: 2px 4px;
            border-radius: 4px;
          }
          .gio-link:hover, .gio-link:focus {
            color: #fff;
            background: #e53935;
            text-shadow: 0 2px 8px #e53935;
            text-decoration: none;
            outline: none;
          }
        `}</style>
      </div>
    </div>
  );
  if (loading) return (
    <div className="gio-loading gio-message">
      <span className="gio-icon gio-spin">🎟️</span>
      <div>Đang tải vé...</div>
    </div>
  );
  if (!veList.length) return (
    <div className="gio-empty gio-message">
      <span className="gio-icon">🛒</span>
      <div>Bạn chưa có vé nào trong giỏ!</div>
    </div>
  );

  console.log(veList);

  return (
    <div className="gio-container">
      <h2 className="gio-title">Giỏ Vé của bạn</h2>
      <ul className="gio-list">
        {veList.map(ve => {
          const suat = suatChieuList.find(s => s.suat_chieu_id === ve.suat_chieu_id);
          const phim = suat ? phimList.find(p => p.phim_id === suat.phim_id || p.id === suat.phim_id) : null;
          const gheArr = ve.chi_tiet?.map(g => g.so_ghe) || [];
          const tongTien = tinhTongTien(ve);

          return (
            <li key={ve.ve_id} className="gio-item">
              <div className="gio-item-flex">
                <div className="gio-img-wrap">
                  <img
                    src={phim?.anh || "https://via.placeholder.com/60x80?text=No+Image"}
                    alt={phim ? (phim.ten || phim.ten_phim) : "Phim"}
                    className="gio-img"
                  />
                </div>
                <div className="gio-info">
                  <div className="gio-phim"><b>Phim:</b> {phim ? (phim.ten || phim.ten_phim) : ve.phim_id}</div>
                  <div><b>Suất chiếu:</b> {suat ? `${suat.ngay_chieu} ${suat.gio_bat_dau ? suat.gio_bat_dau.slice(0,5) : ""}` : ve.suat_chieu_id}</div>
                  <div>
                    <b>Ghế đã đặt:</b>{" "}
                    {gheArr.length > 0 ? (
                      gheArr.map((ghe, idx) => (
                        <span key={ghe} className="gio-ghe">
                          {ghe}
                          {idx < gheArr.length - 1 ? ", " : ""}
                        </span>
                      ))
                    ) : (
                      "Chưa có"
                    )}
                  </div>
                  <div className="gio-tien">
                    <b>Tổng tiền:</b> {tongTien.toLocaleString()} đ
                  </div>
                  {ve.trang_thai_thanh_toan === "Đã thanh toán" ? (
                    <div style={{ color: "#388e3c", fontWeight: 600, marginTop: 4 }}>
                      Đã thanh toán thành công!
                      <div style={{ marginTop: 8 }}>
                        <button
                          style={{
                            padding: "6px 16px",
                            borderRadius: 6,
                            background: "#1976d2",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 600
                          }}
                          onClick={() => window.print()} // hoặc gọi hàm in vé riêng nếu có
                        >
                          In vé
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Nút thanh toán */}
                      <div style={{ marginTop: 8 }}>
                        <button
                          onClick={() => setShowPay(ve.ve_id)}
                          style={{
                            padding: "6px 16px",
                            borderRadius: 6,
                            background: "#e53935",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer"
                          }}
                        >
                          Thanh toán
                        </button>
                      </div>
                      {/* Form thanh toán (hiện khi bấm) */}
                      {showPay === ve.ve_id && (() => {
                        const tongTien = tinhTongTien(ve);
                        return (
                          <div style={{ marginTop: 10, background: "#fff3e0", padding: 10, borderRadius: 8 }}>
                            <div>
                              <b>Chọn hình thức:</b>{" "}
                              <select value={hinhThucMap[ve.ve_id] || ""} onChange={e => setHinhThucMap(h => ({ ...h, [ve.ve_id]: e.target.value }))}>
                                <option value="">-- Chọn --</option>
                                {hinhThucList.map(ht => (
                                  <option key={ht} value={ht}>{ht}</option>
                                ))}
                              </select>
                            </div>
                            {hinhThucMap[ve.ve_id] === "Banking" && parseInt(tongTien, 10) > 0 && (
                              <div style={{ marginTop: 12, textAlign: "center" }}>
                                {/* Đã bỏ phần tạo và hiển thị QR VietQR */}
                              </div>
                            )}
                            {hinhThucMap[ve.ve_id] === "Banking" && parseInt(tongTien, 10) <= 0 && (
                              <div style={{ color: '#e53935', marginTop: 12 }}>Vui lòng kiểm tra lại tổng tiền để tạo mã QR!</div>
                            )}
                            <button
                              onClick={() => handlePay(ve)}
                              style={{ marginTop: 8, padding: "6px 18px", borderRadius: 6, background: "#388e3c", color: "#fff", border: "none", cursor: "pointer" }}
                            >
                              Xác nhận thanh toán
                            </button>
                            <button
                              onClick={() => { setShowPay(null); setHinhThucMap(h => ({ ...h, [ve.ve_id]: "" })); setPayMsg(""); }}
                              style={{ marginLeft: 8, padding: "6px 12px", borderRadius: 6, background: "#bbb", color: "#fff", border: "none", cursor: "pointer" }}
                            >
                              Hủy
                            </button>
                            {payMsg && <div style={{ color: payMsg.includes("thành công") ? "#388e3c" : "#e53935", marginTop: 6 }}>{payMsg}</div>}
                          </div>
                        );
                      })()}
                    </>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <style>{`
        .gio-container {
          max-width: 540px;
          margin: 40px auto;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 12px #eee;
          padding: 28px 16px 20px 16px;
        }
        .gio-title {
          color: #b71c1c;
          font-size: 1.5rem;
          margin-bottom: 22px;
          text-align: center;
          font-weight: 700;
        }
        .gio-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .gio-item {
          background: #fafafa;
          margin-bottom: 16px;
          padding: 12px 10px;
          border-radius: 8px;
          border: 1px solid #eee;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
        }
        .gio-item:last-child {
          margin-bottom: 0;
        }
        .gio-item-flex {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          width: 100%;
        }
        .gio-img-wrap {
          flex-shrink: 0;
          width: 60px;
          height: 80px;
          border-radius: 6px;
          overflow: hidden;
          background: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gio-img {
          width: 60px;
          height: 80px;
          object-fit: cover;
          border-radius: 6px;
          background: #eee;
        }
        .gio-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .gio-phim {
          font-weight: 600;
          color: #b71c1c;
          margin-bottom: 2px;
        }
        .gio-tien {
          margin-top: 2px;
          color: #388e3c;
          font-weight: 600;
        }
        .gio-ghe {
          display: inline-block;
          background: #ececec;
          border-radius: 4px;
          padding: 2px 7px;
          margin-right: 4px;
          font-size: 0.98em;
          color: #444;
          border: 1px solid #e0e0e0;
        }
        @media (max-width: 600px) {
          .gio-container {
            padding: 10px 2px 10px 2px;
          }
          .gio-item {
            padding: 8px 2px;
            font-size: 0.98rem;
          }
          .gio-img-wrap, .gio-img {
            width: 38px;
            height: 52px;
          }
        }
      `}</style>
    </div>
  );
}