import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

export default function DangNhap() {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [thongBao, setThongBao] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tenDangNhap || !matKhau) {
      setThongBao('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:3000/api/dangnhap', {
        tenDangNhap,
        matKhau,
      });

      if (response.data.success) {
        setThongBao('Đăng nhập thành công!');
        login(response.data.user);
        setTimeout(() => {
          navigate(response.data.la_quan_tri ? '/quantri' : '/');
        }, 1000);
      } else {
        setThongBao('Sai tên đăng nhập hoặc mật khẩu.');
      }
    } catch (error) {
      console.error(error);
      setThongBao('Sai tên đăng nhập hoặc mật khẩu.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        {/* Cột trái: Form Đăng Nhập */}
        <div className="form-left">
          <div className="form-header">
            <h2>🔐 Đăng Nhập</h2>
            <p className="form-desc">Đăng nhập để trải nghiệm các tiện ích của Doremi Cinema</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="tenDangNhap">Tên đăng nhập</label>
              <input
                id="tenDangNhap"
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={tenDangNhap}
                onChange={(e) => setTenDangNhap(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="matKhau">Mật khẩu</label>
              <input
                id="matKhau"
                type="password"
                placeholder="Nhập mật khẩu"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <button type="submit" className="login-btn">Đăng Nhập</button>
            {thongBao && (
              <div className={`message ${thongBao.includes('thành công') ? 'success' : 'error'}`}>
                {thongBao}
              </div>
            )}
          </form>
        </div>

        {/* Cột phải: Form Chào mừng + Đăng ký */}
        <div className="form-right">
          <div className="welcome-box">
            <h2>🎬 Chào mừng bạn đến với <span style={{ color: '#e50914' }}>Doremi Cinema</span>!</h2>
            <p>
              Doremi Cinema – thế giới điện ảnh đỉnh cao với hàng ngàn bộ phim hấp dẫn trong nước và quốc tế. <br />
              Tận hưởng hình ảnh sắc nét, âm thanh sống động, đắm chìm vào từng khoảnh khắc. <br />
              Từ phim kinh điển đến bom tấn mới nhất, chúng tôi luôn đồng hành cùng bạn trên hành trình khám phá cảm xúc điện ảnh.
            </p>
            <p>Chưa có tài khoản?</p>
            <Link to="/dangky">
              <button className="signup-btn">Tạo tài khoản ngay</button>
            </Link>
          </div>
        </div>
      </div>
      {/* Nút trở về trang chủ */}
      <div className="back-to-home">
        <Link to="/">
          <button className="back-btn">Trở về Trang Chủ</button>
        </Link>
      </div>

      <style>
        {`
          .login-wrapper {
            min-height: 100vh;
            background: linear-gradient(120deg, #232733 60%, #181c24 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
            padding: 20px;
          }

          .login-box {
            display: flex;
            flex-direction: row;
            background: rgba(28,28,32,0.98);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(40,40,60,0.14), 0 1.5px 0 #e53935 inset;
            max-width: 820px;
            width: 100%;
            gap: 0;
            transition: box-shadow 0.3s;
            animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1);
          }

          .form-left, .form-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-width: 300px;
            max-width: 400px;
            transition: background 0.3s;
          }

          .form-left {
            background: rgba(35,39,51,0.98);
            border-radius: 20px 0 0 20px;
            border-right: 1.5px solid #232733;
            box-shadow: 0 4px 18px rgba(40,40,60,0.10);
            padding: 44px 36px 36px 36px;
            animation: fadeInLeft 0.7s cubic-bezier(.4,0,.2,1);
          }

          .form-header h2 {
            margin-bottom: 8px;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: 1px;
            color: #e53935;
            text-shadow: 0 2px 16px #e53935, 0 1px 0 #fff;
            animation: fadeInDown 0.7s cubic-bezier(.4,0,.2,1);
          }
          .form-desc {
            color: #bdbdbd;
            font-size: 1.05rem;
            margin-bottom: 18px;
            font-weight: 400;
            letter-spacing: 0.1px;
          }

          .login-form {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .form-group label {
            font-size: 1rem;
            color: #e57373;
            font-weight: 500;
            margin-bottom: 2px;
            letter-spacing: 0.2px;
          }
          .form-group input {
            background: #232733;
            color: #fff;
            border: 2px solid #444857;
            border-radius: 10px;
            padding: 13px 14px;
            font-size: 1.08rem;
            transition: border-color 0.3s, box-shadow 0.3s, background 0.3s, color 0.3s;
            outline: none;
          }
          .form-group input:focus {
            border-color: #e53935;
            box-shadow: 0 0 10px #e53935;
            background: #24292f;
            color: #fff;
          }
          .form-group input::placeholder {
            color: #bdbdbd;
            opacity: 1;
            font-size: 1.05em;
            letter-spacing: 0.2px;
          }

          .login-btn {
            padding: 13px;
            border: none;
            border-radius: 10px;
            background: linear-gradient(90deg, #e53935 60%, #ffb199 100%);
            color: #fff;
            font-weight: bold;
            font-size: 1.08rem;
            cursor: pointer;
            transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
            box-shadow: 0 4px 15px rgba(229,57,53,0.13);
            margin-top: 8px;
            letter-spacing: 0.5px;
          }
          .login-btn:hover {
            background: linear-gradient(90deg, #b71c1c 60%, #e57373 100%);
            transform: translateY(-2px) scale(1.04);
            box-shadow: 0 8px 24px rgba(229,57,53,0.18);
          }

          .message {
            margin-top: 12px;
            font-size: 15px;
            font-weight: 500;
            border-radius: 6px;
            padding: 7px 12px;
            background: rgba(229,57,53,0.07);
            text-align: left;
            transition: color 0.3s, background 0.3s;
          }
          .message.success {
            color: #43e97b;
            background: rgba(67,233,123,0.07);
          }
          .message.error {
            color: #e57373;
            background: rgba(229,57,53,0.10);
          }

          .form-right {
            background: linear-gradient(135deg, #232733 70%, #e53935 120%);
            border-radius: 0 20px 20px 0;
            text-align: center;
            color: #fff;
            border-left: 1.5px solid #e53935;
            box-shadow: 0 4px 18px rgba(229,57,53,0.10);
            animation: fadeInRight 0.7s cubic-bezier(.4,0,.2,1);
            justify-content: center;
            padding: 44px 36px 36px 36px;
            display: flex;
            flex-direction: column;
          }
          .welcome-box h2 {
            color: #fff;
            text-shadow: 0 2px 16px #e53935, 0 1px 0 #fff;
            font-size: 1.35rem;
            margin-bottom: 18px;
          }
          .welcome-box p {
            font-size: 1.08rem;
            margin-bottom: 18px;
            color: #ffe0b2;
            animation: fadeIn 1s cubic-bezier(.4,0,.2,1);
          }
          .signup-btn {
            background: linear-gradient(90deg, #0288d1 60%, #81d4fa 100%);
            margin-top: 0;
            color: #fff;
            font-weight: 700;
            font-size: 1.08rem;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(2,136,209,0.13);
            transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
            border: none;
            border-radius: 10px;
            padding: 13px 0;
            width: 100%;
            cursor: pointer;
          }
          .signup-btn:hover {
            background: linear-gradient(90deg, #01579b 60%, #4fc3f7 100%);
            transform: translateY(-2px) scale(1.04);
            box-shadow: 0 8px 24px rgba(2,136,209,0.18);
          }

          /* Back to Home Button */
          .back-to-home {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            width: 100%;
            max-width: 820px;
          }
          .back-btn {
          padding: 13px 20px;
          border: none;
          border-radius: 10px;
          background: #6b7280; /* Solid gray */
          color: #fff;
          font-weight: bold;
          font-size: 1.08rem;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
          box-shadow: 0 4px 15px rgba(107,114,128,0.13); /* Shadow matches gray */
          letter-spacing: 0.5px;
        }
        .back-btn:hover {
          background: #4b5563; /* Darker gray for hover */
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 24px rgba(75,85,99,0.18); /* Shadow matches hover gray */
        }

          /* Animation keyframes */
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-40px);}
            to { opacity: 1; transform: none;}
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(40px);}
            to { opacity: 1; transform: none;}
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px);}
            to { opacity: 1; transform: none;}
          }
          @keyframes fadeIn {
            from { opacity: 0;}
            to { opacity: 1;}
          }

          @media (max-width: 900px) {
            .login-box {
              flex-direction: column;
              gap: 0;
              max-width: 98vw;
            }
            .form-left, .form-right {
              border-radius: 16px;
              border: none;
              max-width: 98vw;
              min-width: unset;
              margin-bottom: 18px;
              padding: 28px 12px;
            }
            .form-right {
              padding-top: 18px;
              padding-bottom: 18px;
            }
            .back-to-home {
              margin-top: 10px;
            }
          }
        `}
      </style>
    </div>
  );
}