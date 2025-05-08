import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import QuanLyPhim from './QuanLyPhim';
import QuanLySuatChieu from './QuanLySuatChieu';
import QuanLyNguoiDung from './QuanLyNguoiDung';
import ThongKe from './ThongKe';

export default function QuanTri() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Tài khoản hoặc mật khẩu không đúng!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginForm}>
          <h2 style={styles.loginTitle}>Đăng Nhập Quản Trị</h2>
          <form onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Tài khoản</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                placeholder="Nhập tài khoản"
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={styles.loginButton}>Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Quản Trị</h2>
          <nav style={styles.nav}>
            <Link to="/quantri/phim" style={styles.navLink}>
              <i className="fas fa-film" style={styles.icon}></i> Quản lý phim
            </Link>
            <Link to="/quantri/suatchieu" style={styles.navLink}>
              <i className="fas fa-clock" style={styles.icon}></i> Quản lý suất chiếu
            </Link>
            <Link to="/quantri/nguoidung" style={styles.navLink}>
              <i className="fas fa-users" style={styles.icon}></i> Quản lý người dùng
            </Link>
            <Link to="/quantri/thongke" style={styles.navLink}>
              <i className="fas fa-chart-bar" style={styles.icon}></i> Thống kê
            </Link>
          </nav>
        </div>
        <div style={styles.content}>
          <h2 style={styles.greeting}>Chào mừng bạn đến với hệ thống Quản lý Phim</h2>
          <Routes>
            <Route path="/quantri/phim" element={<QuanLyPhim />} />
            <Route path="/quantri/suatchieu" element={<QuanLySuatChieu />} />
            <Route path="/quantri/nguoidung" element={<QuanLyNguoiDung />} />
            <Route path="/quantri/thongke" element={<ThongKe />} />
          </Routes>
        </div>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </>
  );
}

const styles = {
  // Login form styles
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
    fontFamily: "'Roboto', sans-serif",
  },
  loginForm: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  loginTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: '20px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    fontSize: '16px',
    color: '#1b5e20',
    marginBottom: '8px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #81c784',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  inputFocus: {
    borderColor: '#2e7d32',
    boxShadow: '0 0 8px rgba(46, 125, 50, 0.3)',
  },
  error: {
    color: '#d32f2f',
    fontSize: '14px',
    marginBottom: '15px',
  },
  loginButton: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ffffff',
    background: '#2e7d32',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.2s ease',
  },
  loginButtonHover: {
    background: '#388e3c',
    transform: 'scale(1.02)',
  },

  // Existing QuanTri styles
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
  },
  sidebar: {
    width: '250px',
    background: 'linear-gradient(180deg, #c8e6c9, #a5d6a7)',
    color: '#1b5e20',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
  },
  sidebarTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: 'bold',
    borderBottom: '2px solid #81c784',
    paddingBottom: '10px',
    color: '#2e7d32',
    textAlign: 'center',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#1b5e20',
    fontSize: '18px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 15px',
    borderRadius: '8px',
    transition: 'background-color 0.3s, transform 0.2s',
    background: 'rgba(255, 255, 255, 0.8)',
  },
  icon: {
    fontSize: '20px',
    width: '20px',
    textAlign: 'center',
  },
  content: {
    marginLeft: '250px',
    padding: '40px',
    width: 'calc(100% - 250px)',
    background: 'rgba(255, 255, 255, 0.95)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  greeting: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: '30px',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  },
};