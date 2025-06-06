import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const hinhThucList = ["Momo", "ZaloPay", "Banking"];

export default function ThanhToan() {
  const { ve_id } = useParams();
  const [so_tien, setSoTien] = useState("");
  const [hinh_thuc, setHinhThuc] = useState("");
  const [thongBao, setThongBao] = useState("");
  const navigate = useNavigate();

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
      {thongBao && <div>{thongBao}</div>}
    </div>
  );
}