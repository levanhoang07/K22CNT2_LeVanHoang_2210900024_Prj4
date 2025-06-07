import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getVietQRUrl } from "./getVietQRUrl";

const hinhThucList = ["Momo", "ZaloPay", "Banking"];

export default function ThanhToan() {
  const { ve_id } = useParams();
  const [so_tien, setSoTien] = useState("");
  const [hinh_thuc, setHinhThuc] = useState("");
  const [thongBao, setThongBao] = useState("");
  const navigate = useNavigate();

  // Tạo nội dung QR cho Banking
  const qrContent = `Chuyen khoan Techcombank ve ${ve_id} so tien ${so_tien} STK 6982121680 CTK LE VAN HOANG`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3000/api/thanhtoan", {
        ve_id: Number(ve_id),
        so_tien: Number(so_tien),
        hinh_thuc,
        trang_thai: "Chờ xử lý",
      });
      setThongBao("Thanh toán thành công! Đang chuyển về trang vé...");
      setTimeout(() => navigate("/giove"), 1500);
    } catch {
      setThongBao("Lỗi khi thanh toán!");
    }
  };

  console.log("hinh_thuc:", hinh_thuc, "so_tien:", so_tien, "qrContent:", qrContent);

  return (
    <div>
      <h2>Thanh toán vé #{ve_id}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Số tiền"
          value={so_tien}
          onChange={(e) => setSoTien(e.target.value)}
          required
        />
        <select
          value={hinh_thuc}
          onChange={(e) => setHinhThuc(e.target.value)}
          required
        >
          <option value="">-- Hình thức --</option>
          {hinhThucList.map((ht) => (
            <option key={ht} value={ht}>{ht}</option>
          ))}
        </select>
        <button type="submit">Thanh toán</button>
      </form>

      {/* Hiện QR nếu chọn Banking */}
      {hinh_thuc === "Banking" && so_tien && Number(so_tien) > 0 && (() => {
        const qrUrl = getVietQRUrl({
          bank: "TCB",
          accountName: "LE VAN HOANG",
          accountNumber: "6982121680",
          amount: so_tien,
          addInfo: `THANH TOAN VE ${ve_id}`
        });
        return (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <b>Quét mã QR bằng app ngân hàng (VietQR):</b>
            <br />
            <img
              key={`qr-${ve_id}-${so_tien}`}
              src={qrUrl}
              alt="QR Banking"
              style={{ marginTop: 8, border: '1px solid #ccc', borderRadius: 8 }}
              onError={e => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/200x200?text=QR+Error';
                console.error('Không thể tải ảnh QR:', e.target.src);
              }}
            />
            <div style={{ marginTop: 8 }}>
              <a href={qrUrl}
                target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', fontSize: 14 }}>
                Nếu không hiện QR, bấm vào đây để mở ảnh QR trong tab mới
              </a>
            </div>
            <div style={{ marginTop: 8, color: "#1976d2" }}>
              Nội dung chuyển khoản: <b>{`THANH TOAN VE ${ve_id}`}</b>
            </div>
            <div style={{ marginTop: 12, color: '#b71c1c', fontWeight: 600 }}>
              Ngân hàng: <b>Techcombank</b><br/>
              STK: <b>6982121680</b><br/>
              CTK: <b>LE VAN HOANG</b>
            </div>
          </div>
        );
      })()}
      {/* Cảnh báo nếu số tiền không hợp lệ */}
      {hinh_thuc === "Banking" && so_tien && Number(so_tien) <= 0 && (
        <div style={{ color: '#e53935', marginTop: 12 }}>Vui lòng nhập số tiền hợp lệ để tạo mã QR!</div>
      )}

      {thongBao && <div style={{ marginTop: 16, color: "#e53935" }}>{thongBao}</div>}
    </div>
  );
}