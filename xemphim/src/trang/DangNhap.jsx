import React, { useState } from 'react';

export default function DangNhap() {
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [thongBao, setThongBao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra đơn giản
    if (!email || !matKhau) {
      setThongBao('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    // Giả sử kiểm tra đúng thông tin
    if (email === 'user@example.com' && matKhau === '123456') {
      setThongBao('Đăng nhập thành công!');
    } else {
      setThongBao('Sai email hoặc mật khẩu.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>🔐 Đăng Nhập</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }}>
          Đăng Nhập
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
