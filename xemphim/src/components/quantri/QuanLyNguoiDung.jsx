import React, { useState } from 'react';

export default function QuanLyNguoiDung() {
  const [danhSach, setDanhSach] = useState([
    { id: 1, ten: 'Nguyễn Văn A', email: 'a@example.com', vaiTro: 'Admin' },
    { id: 2, ten: 'Trần Thị B', email: 'b@example.com', vaiTro: 'User' },
  ]);

  const [nguoiDungMoi, setNguoiDungMoi] = useState({ ten: '', email: '', vaiTro: 'User' });
  const [dangSuaId, setDangSuaId] = useState(null);

  const handleThayDoi = (e) => {
    setNguoiDungMoi({ ...nguoiDungMoi, [e.target.name]: e.target.value });
  };

  const handleThem = () => {
    if (!nguoiDungMoi.ten || !nguoiDungMoi.email) return;
    setDanhSach([
      ...danhSach,
      {
        ...nguoiDungMoi,
        id: Date.now(),
      },
    ]);
    setNguoiDungMoi({ ten: '', email: '', vaiTro: 'User' });
  };

  const handleXoa = (id) => {
    setDanhSach(danhSach.filter((u) => u.id !== id));
  };

  const handleSua = (nguoiDung) => {
    setDangSuaId(nguoiDung.id);
    setNguoiDungMoi({ ten: nguoiDung.ten, email: nguoiDung.email, vaiTro: nguoiDung.vaiTro });
  };

  const handleCapNhat = () => {
    setDanhSach(
      danhSach.map((u) =>
        u.id === dangSuaId ? { ...u, ...nguoiDungMoi } : u
      )
    );
    setDangSuaId(null);
    setNguoiDungMoi({ ten: '', email: '', vaiTro: 'User' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quản Lý Người Dùng</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="ten"
          placeholder="Tên"
          value={nguoiDungMoi.ten}
          onChange={handleThayDoi}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={nguoiDungMoi.email}
          onChange={handleThayDoi}
        />
        <select name="vaiTro" value={nguoiDungMoi.vaiTro} onChange={handleThayDoi}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        {dangSuaId ? (
          <button onClick={handleCapNhat}>Cập nhật</button>
        ) : (
          <button onClick={handleThem}>Thêm</button>
        )}
      </div>

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {danhSach.map((nguoiDung) => (
            <tr key={nguoiDung.id}>
              <td>{nguoiDung.id}</td>
              <td>{nguoiDung.ten}</td>
              <td>{nguoiDung.email}</td>
              <td>{nguoiDung.vaiTro}</td>
              <td>
                <button onClick={() => handleSua(nguoiDung)}>Sửa</button>
                <button onClick={() => handleXoa(nguoiDung.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
