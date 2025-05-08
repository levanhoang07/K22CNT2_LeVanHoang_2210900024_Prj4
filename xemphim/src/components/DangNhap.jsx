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
    <>
      <div className="dang-nhap-container">
        <div className="dang-nhap-form">
          <h1 className="dang-nhap-title">🔐 Đăng Nhập</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
                className="input"
                required
              />
            </div>
            <div className="input-group">
              <label className="label">Mật khẩu</label>
              <input
                type="password"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="input"
                required
              />
            </div>
            <button type="submit" className="dang-nhap-button">Đăng Nhập</button>
          </form>
          {thongBao && (
            <p className={`thong-bao ${thongBao.includes('thành công') ? 'success' : 'error'}`}>
              {thongBao}
            </p>
          )}
        </div>
      </div>

      <style>
        {`
          .dang-nhap-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
            font-family: 'Roboto', sans-serif;
            padding: 20px;
          }

          .dang-nhap-form {
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            text-align: center;
          }

          .dang-nhap-title {
            font-size: 28px;
            font-weight: bold;
            color: #2e7d32;
            margin-bottom: 20px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
          }

          .input-group {
            margin-bottom: 20px;
            text-align: left;
          }

          .label {
            font-size: 16px;
            color: #1b5e20;
            margin-bottom: 8px;
            display: block;
            font-weight: 500;
          }

          .input {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            border: 2px solid #81c784;
            border-radius: 8px;
            outline: none;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }

          .input:focus {
            border-color: #2e7d32;
            box-shadow: 0 0 8px rgba(46, 125, 50, 0.3);
          }

          .input::placeholder {
            color: #81c784;
          }

          .dang-nhap-button {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            font-weight: bold;
            color: #ffffff;
            background: #2e7d32;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s ease, transform 0.2s ease;
          }

          .dang-nhap-button:hover {
            background: #388e3c;
            transform: scale(1.02);
          }

          .thong-bao {
            margin-top: 15px;
            font-size: 14px;
            font-weight: 500;
          }

          .thong-bao.success {
            color: #2e7d32;
          }

          .thong-bao.error {
            color: #d32f2f;
          }

          @media (max-width: 480px) {
            .dang-nhap-form {
              padding: 20px;
            }

            .dang-nhap-title {
              font-size: 24px;
            }

            .input {
              padding: 10px;
              font-size: 14px;
            }

            .dang-nhap-button {
              padding: 10px;
              font-size: 14px;
            }
          }
        `}
      </style>
    </>
  );
}