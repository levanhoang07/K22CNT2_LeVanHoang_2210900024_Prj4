import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:3000/api";

const hinhThucList = ["Momo", "ZaloPay", "Banking"];
const trangThaiList = ["Đã thanh toán", "Chờ xử lý", "Đã hủy"];

export default function QuanLyThanhToan() {
  const [list, setList] = useState([]);
  const [veList, setVeList] = useState([]);
  const [form, setForm] = useState({
    ve_id: "",
    so_tien: "",
    hinh_thuc: "",
    trang_thai: "",
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Lấy danh sách thanh toán và vé
  useEffect(() => {
    fetchData();
    fetchVe();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${API_BASE_URL}/thanhtoan`);
    setList(res.data);
  };

  const fetchVe = async () => {
    const res = await axios.get(`${API_BASE_URL}/vedat`);
    setVeList(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "so_tien" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API_BASE_URL}/thanhtoan/${currentId}`, form);
      } else {
        await axios.post(`${API_BASE_URL}/thanhtoan`, form);
      }
      setForm({
        ve_id: "",
        so_tien: "",
        hinh_thuc: "",
        trang_thai: "",
      });
      setEditing(false);
      setCurrentId(null);
      fetchData();
    } catch (err) {
      alert("Lỗi khi lưu thanh toán!");
    }
  };

  const handleEdit = (item) => {
    setForm({
      ve_id: item.ve_id,
      so_tien: item.so_tien,
      hinh_thuc: item.hinh_thuc,
      trang_thai: item.trang_thai,
    });
    setEditing(true);
    setCurrentId(item.thanh_toan_id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      await axios.delete(`${API_BASE_URL}/thanhtoan/${id}`);
      fetchData();
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2>Quản lý thanh toán</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <select
          name="ve_id"
          value={form.ve_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn vé --</option>
          {veList.map((ve) => (
            <option key={ve.ve_id} value={ve.ve_id}>
              Vé #{ve.ve_id}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="so_tien"
          placeholder="Số tiền"
          min={0}
          value={form.so_tien}
          onChange={handleChange}
          required
        />
        <select
          name="hinh_thuc"
          value={form.hinh_thuc}
          onChange={handleChange}
          required
        >
          <option value="">-- Hình thức --</option>
          {hinhThucList.map((ht) => (
            <option key={ht} value={ht}>
              {ht}
            </option>
          ))}
        </select>
        <select
          name="trang_thai"
          value={form.trang_thai}
          onChange={handleChange}
          required
        >
          <option value="">-- Trạng thái --</option>
          {trangThaiList.map((tt) => (
            <option key={tt} value={tt}>
              {tt}
            </option>
          ))}
        </select>
        <button type="submit">{editing ? "Cập nhật" : "Thêm mới"}</button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setForm({
                ve_id: "",
                so_tien: "",
                hinh_thuc: "",
                trang_thai: "",
              });
              setCurrentId(null);
            }}
          >
            Hủy
          </button>
        )}
      </form>
      <table border={1} cellPadding={8} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vé</th>
            <th>Số tiền</th>
            <th>Hình thức</th>
            <th>Trạng thái</th>
            <th>Thời gian</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.thanh_toan_id}>
              <td>{item.thanh_toan_id}</td>
              <td>#{item.ve_id}</td>
              <td>{item.so_tien?.toLocaleString("vi-VN")} đ</td>
              <td>{item.hinh_thuc}</td>
              <td>{item.trang_thai}</td>
              <td>
                {item.thoi_gian_thanh_toan &&
                  new Date(item.thoi_gian_thanh_toan).toLocaleString("vi-VN")}
              </td>
              <td>
                <button onClick={() => handleEdit(item)}>Sửa</button>
                <button onClick={() => handleDelete(item.thanh_toan_id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}