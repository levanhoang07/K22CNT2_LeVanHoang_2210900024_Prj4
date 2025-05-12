import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Thêm Outlet để render các Route con

export default function QuanTri() {
  return (
    <>
      <div style={styles.container}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Quản Trị</h2>
          <nav style={styles.nav}>
            {/* Các liên kết cho các route con */}
            <Link to="nguoidung" style={styles.navLink}>Quản lý người dùng</Link>
            <Link to="phim" style={styles.navLink}>Quản lý phim</Link>
            <Link to="suatchieu" style={styles.navLink}>Quản lý suất chiếu</Link>
            <Link to="phongchieu" style={styles.navLink}>Quản lý phòng chiếu</Link>
            <Link to="ghe" style={styles.navLink}>Quản lý ghế</Link>
            <Link to="vedat" style={styles.navLink}>Quản lý vé đặt</Link>
          </nav>
        </div>

        {/* Nội dung chính */}
        <div style={styles.content}>
          <h2 style={styles.greeting}>Chào mừng bạn đến với hệ thống Quản lý Phim Doremi Cinema</h2>

          {/* Đây là nơi các route con sẽ được render */}
          <Outlet />
        </div>
      </div>

      {/* Thêm Font Awesome nếu cần */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
    </>
  );
}

const styles = {
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
