import React, { useState } from 'react';

export default function DangKy() {
  const [hoTen, setHoTen] = useState('');
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');
  const [thongBao, setThongBao] = useState('');

  const handleDangKy = (e) => {
    e.preventDefault();

    if (!hoTen || !email || !matKhau || !xacNhanMatKhau) {
      setThongBao('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (matKhau !== xacNhanMatKhau) {
      setThongBao('Mật khẩu xác nhận không khớp.');
      return;
    }

    // Giả sử thành công (sau này có thể tích hợp backend/Firebase)
    setThongBao('Đăng ký thành công!');
    setHoTen('');
    setEmail('');
    setMatKhau('');
    setXacNhanMatKhau('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1>📝 Đăng Ký</h1>
      <form onSubmit={handleDangKy}>
        <div style={{ marginBottom: '10px' }}>
          <label>Họ tên:</label><br />
          <input
            type="text"
            value={hoTen}
            onChange={(e) => setHoTen(e.target.value)}
            placeholder="Nhập họ tên"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Mật khẩu:</label><br />
          <input
            type="password"
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
            placeholder="Nhập mật khẩu"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Xác nhận mật khẩu:</label><br />
          <input
            type="password"
            value={xacNhanMatKhau}
            onChange={(e) => setXacNhanMatKhau(e.target.value)}
            placeholder="Nhập lại mật khẩu"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none' }}>
          Đăng Ký
        </button>
      </form>

      {thongBao && (
        <p style={{ marginTop: '15px', color: thongBao.includes('thành công') ? 'green' : 'red' }}>
          {thongBao}
        </p>
      )}
    </div>
  );
}
