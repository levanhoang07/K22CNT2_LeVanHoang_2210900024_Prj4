import React, { useState } from 'react';

export default function QuanLyNguoiDung() {
  const [danhSach, setDanhSach] = useState([
    { id: 1, ten: 'Nguyễn Văn A', email: 'a@example.com', matKhau: '123456', vaiTro: 'Admin' },
    { id: 2, ten: 'Trần Thị B', email: 'b@example.com', matKhau: 'abcdef', vaiTro: 'User' },
  ]);

  const [nguoiDungMoi, setNguoiDungMoi] = useState({ ten: '', email: '', matKhau: '', vaiTro: 'User' });
  const [dangSuaId, setDangSuaId] = useState(null);

  // Track the last used ID
  const [lastId, setLastId] = useState(2);

  const handleThayDoi = (e) => {
    setNguoiDungMoi({ ...nguoiDungMoi, [e.target.name]: e.target.value });
  };

  const handleThem = () => {
    if (!nguoiDungMoi.ten || !nguoiDungMoi.email || !nguoiDungMoi.matKhau) return;
    setDanhSach([
      ...danhSach,
      {
        ...nguoiDungMoi,
        id: lastId + 1, // Use the last ID and increment it
      },
    ]);
    setLastId(lastId + 1); // Update the last used ID
    setNguoiDungMoi({ ten: '', email: '', matKhau: '', vaiTro: 'User' });
  };

  const handleXoa = (id) => {
    setDanhSach(danhSach.filter((u) => u.id !== id));
  };

  const handleSua = (nguoiDung) => {
    setDangSuaId(nguoiDung.id);
    setNguoiDungMoi({
      ten: nguoiDung.ten,
      email: nguoiDung.email,
      matKhau: nguoiDung.matKhau,
      vaiTro: nguoiDung.vaiTro,
    });
  };

  const handleCapNhat = () => {
    setDanhSach(
      danhSach.map((u) =>
        u.id === dangSuaId ? { ...u, ...nguoiDungMoi } : u
      )
    );
    setDangSuaId(null);
    setNguoiDungMoi({ ten: '', email: '', matKhau: '', vaiTro: 'User' });
  };

  const styles = {
    container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
    form: { marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' },
    input: { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    th: {
      backgroundColor: '#f4f4f4',
      padding: '10px',
      textAlign: 'left',
      borderBottom: '2px solid #ddd',
      borderRight: '1px solid #ddd',
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
      borderRight: '1px solid #ddd', // Add right border for columns
    },
    actionBtn: {
      marginRight: '5px',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    editBtn: { backgroundColor: '#ffc107', color: 'black' },
    deleteBtn: { backgroundColor: '#dc3545', color: 'white' },
    formContainer: { marginBottom: '20px' }, // Space between form and table
  };

  return (
    <div style={styles.container}>
      <h2>Quản Lý Người Dùng</h2>

      <div style={styles.formContainer}>
        <div style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="ten"
            placeholder="Tên"
            value={nguoiDungMoi.ten}
            onChange={handleThayDoi}
          />
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={nguoiDungMoi.email}
            onChange={handleThayDoi}
          />
          <input
            style={styles.input}
            type="text" // Change this from 'password' to 'text'
            name="matKhau"
            placeholder="Mật khẩu"
            value={nguoiDungMoi.matKhau}
            onChange={handleThayDoi}
          />
          <select
            name="vaiTro"
            value={nguoiDungMoi.vaiTro}
            onChange={handleThayDoi}
            style={styles.input}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          {dangSuaId ? (
            <button style={{ ...styles.button, backgroundColor: '#28a745' }} onClick={handleCapNhat}>
              Cập nhật
            </button>
          ) : (
            <button style={styles.button} onClick={handleThem}>
              Thêm
            </button>
          )}
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Tên</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Mật khẩu</th>
            <th style={styles.th}>Vai trò</th>
            <th style={styles.th}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {danhSach.map((nguoiDung) => (
            <tr key={nguoiDung.id}>
              <td style={styles.td}>{nguoiDung.id}</td>
              <td style={styles.td}>{nguoiDung.ten}</td>
              <td style={styles.td}>{nguoiDung.email}</td>
              <td style={styles.td}>{nguoiDung.matKhau}</td>
              <td style={styles.td}>{nguoiDung.vaiTro}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.actionBtn, ...styles.editBtn }}
                  onClick={() => handleSua(nguoiDung)}
                >
                  Sửa
                </button>
                <button
                  style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                  onClick={() => handleXoa(nguoiDung.id)}
                >
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
