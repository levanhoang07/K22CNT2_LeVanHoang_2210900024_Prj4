import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:3000/api";

const hinhThucList = ["Momo", "ZaloPay", "Banking"];
const trangThaiList = ["Đã thanh toán", "Chờ xử lý", "Đã hủy"];

export default function QuanLyThanhToan() {
  const [list, setList] = useState([]);
  const [veList, setVeList] = useState([]);
  const [suatChieuList, setSuatChieuList] = useState([]);
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
    fetchSuatChieu();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${API_BASE_URL}/thanhtoan`);
    setList(res.data);
  };

  const fetchVe = async () => {
    const res = await axios.get(`${API_BASE_URL}/vedat`);
    setVeList(res.data);
  };

  const fetchSuatChieu = async () => {
    const res = await axios.get(`${API_BASE_URL}/suatchieu`);
    setSuatChieuList(res.data);
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
        <button type="submit" style={{ backgroundColor: editing ? '#f39c12' : '#4CAF50', color: 'white', border: 'none', borderRadius: 5, padding: '8px 12px', marginRight: editing ? 5 : 0, cursor: 'pointer' }}>
          {editing ? "Cập nhật" : "Cập nhật"}
        </button>
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
            style={{ backgroundColor: '#bbb', color: '#fff', border: 'none', borderRadius: 5, padding: '8px 12px', marginLeft: 5, cursor: 'pointer' }}
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
            <th>Thời gian</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            // Tìm vé tương ứng để lấy suat_chieu_id
            const ve = veList.find(v => v.ve_id === item.ve_id);
            const suat = ve ? suatChieuList.find(s => s.suat_chieu_id === ve.suat_chieu_id) : null;
            return (
              <tr key={item.thanh_toan_id}>
                <td>{item.thanh_toan_id}</td>
                <td>#{item.ve_id}</td>
                <td>{item.so_tien?.toLocaleString("vi-VN")} đ</td>
                <td>{item.hinh_thuc}</td>
                <td>{suat ? `${suat.ngay_chieu} ${suat.gio_bat_dau ? suat.gio_bat_dau.slice(0,5) : ''}` : ''}</td>
                <td>
                  <span
                    className={
                      item.trang_thai === "Đã thanh toán"
                        ? "status-paid"
                        : item.trang_thai === "Chờ xử lý"
                        ? "status-pending"
                        : item.trang_thai === "Đã hủy"
                        ? "status-cancelled"
                        : ""
                    }
                  >
                    {item.trang_thai}
                  </span>
                </td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(item)} style={{ backgroundColor: '#f39c12' }}>Sửa</button>
                  <button className="delete-button" onClick={() => handleDelete(item.thanh_toan_id)} style={{ backgroundColor: '#e74c3c' }}>Xóa</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <style jsx>{`
        .container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h2 {
          color: #333;
          margin-bottom: 20px;
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }
        select, input, button {
          padding: 8px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ddd;
        }
        button {
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #45a049;
        }
        .styled-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ddd;
        }
        th {
          background-color: #f4f4f4;
          font-weight: bold;
        }
        td {
          background-color: #fff;
        }
        td:nth-child(odd) {
          background-color: #f9f9f9;
        }
        .edit-button {
          background-color: #f39c12;
          color: white;
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          margin-right: 5px;
          cursor: pointer;
        }
        .edit-button:hover {
          background-color: #e67e22;
        }
        .delete-button {
          background-color: #e74c3c;
          color: white;
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .delete-button:hover {
          background-color: #c0392b;
        }
        .status-paid {
          color: #27ae60;
          font-weight: bold;
          background: #eafaf1;
          border-radius: 4px;
          padding: 3px 10px;
          border: 1px solid #27ae60;
          display: inline-block;
        }
        .status-pending {
          color: #2980d9;
          font-weight: bold;
          background: #eaf1fa;
          border-radius: 4px;
          padding: 3px 10px;
          border: 1px solid #2980d9;
          display: inline-block;
        }
        .status-cancelled {
          color: #e74c3c;
          font-weight: bold;
          background: #faeaea;
          border-radius: 4px;
          padding: 3px 10px;
          border: 1px solid #e74c3c;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}