import React, { useState } from 'react';
import axios from 'axios';

export default function DangKy() {
  const [hoTen, setHoTen] = useState('');
  const [email, setEmail] = useState('');
  const [sdt, setSdt] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');
  const [thongBao, setThongBao] = useState('');
  const [dangXuLy, setDangXuLy] = useState(false);

  const handleDangKy = async (e) => {
    e.preventDefault();

    if (!hoTen || !email || !sdt || !matKhau || !xacNhanMatKhau) {
      setThongBao('❗ Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (matKhau !== xacNhanMatKhau) {
      setThongBao('❗ Mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      setDangXuLy(true);
      const response = await axios.post('http://localhost:3000/api/dangky', {
        hoTen,
        email,
        sdt,
        matKhau,
        role: 'user',
      });

      if (response.data.success) {
        setThongBao('✅ Đăng ký thành công!');
        setHoTen('');
        setEmail('');
        setSdt('');
        setMatKhau('');
        setXacNhanMatKhau('');
      } else {
        setThongBao(`❌ ${response.data.message || 'Đăng ký thất bại.'}`);
      }
    } catch (error) {
      setThongBao(`❌ Lỗi kết nối hoặc lỗi máy chủ.`);
    } finally {
      setDangXuLy(false);
    }
  };

  return (
    <div className="dang-nhap-container">
      <form className="dang-nhap-form" onSubmit={handleDangKy}>
        <h1 className="dang-nhap-title">📝 Đăng Ký</h1>

        <div className="input-group">
          <label className="label">Họ tên:</label>
          <input
            type="text"
            value={hoTen}
            onChange={(e) => setHoTen(e.target.value)}
            placeholder="Nhập họ tên"
            className="input"
          />
        </div>

        <div className="input-group">
          <label className="label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            className="input"
          />
        </div>

        <div className="input-group">
          <label className="label">Số điện thoại:</label>
          <input
            type="text"
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
            placeholder="Nhập số điện thoại"
            className="input"
          />
        </div>

        <div className="input-group">
          <label className="label">Mật khẩu:</label>
          <input
            type="password"
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
            placeholder="Nhập mật khẩu"
            className="input"
          />
        </div>

        <div className="input-group">
          <label className="label">Xác nhận mật khẩu:</label>
          <input
            type="password"
            value={xacNhanMatKhau}
            onChange={(e) => setXacNhanMatKhau(e.target.value)}
            placeholder="Nhập lại mật khẩu"
            className="input"
          />
        </div>

        <button type="submit" className="dang-nhap-button" disabled={dangXuLy}>
          {dangXuLy ? 'Đang xử lý...' : 'Đăng Ký'}
        </button>

        {thongBao && (
          <p className={`thong-bao ${thongBao.includes('thành công') ? 'success' : 'error'}`}>
            {thongBao}
          </p>
        )}

        <p className="dang-nhap-link">
          Đã có tài khoản? <a href="/dangnhap">Đăng nhập</a>
        </p>
      </form>

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

          .dang-nhap-link {
            margin-top: 20px;
            font-size: 14px;
            color: #555;
          }

          .dang-nhap-link a {
            color: #2e7d32;
            text-decoration: none;
            font-weight: 500;
          }

          .dang-nhap-link a:hover {
            text-decoration: underline;
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
    </div>
  );
}
