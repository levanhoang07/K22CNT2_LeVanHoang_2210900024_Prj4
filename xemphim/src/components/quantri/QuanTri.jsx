import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export default function QuanTri() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [logoutHover, setLogoutHover] = useState(false); // Added state for logout hover

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
       {/* Header */}
      <header className="header">
        <div className="header-container">
          {/* <span className="site-logo">DOREMI <span className="logo-red">CINEMA</span></span> */}
          <nav className="main-nav">
            <ul className="nav-links plain-links">
              {user && (
                <>
                  <li>
                    <span className="greeting">Xin chào, {user.ho_ten}</span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="logout-button"
                      onMouseEnter={() => setLogoutHover(true)} // Now defined
                      onMouseLeave={() => setLogoutHover(false)} // Now defined
                    >
                      Đăng xuất
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>🎬 Doremi Cinema</h2>
          <nav style={styles.nav}>
            <Link to="nguoidung" style={styles.navLink}>Quản lý người dùng</Link>
            <Link to="phim" style={styles.navLink}>Quản lý phim</Link>
            <Link to="vedat" style={styles.navLink}>Quản lý vé đặt</Link>
            <Link to="thanhtoan" style={styles.navLink}>Quản lý thanh toán</Link>
            <Link to="phongchieu" style={styles.navLink}>Quản lý phòng chiếu</Link>
            <Link to="suatchieu" style={styles.navLink}>Quản lý suất chiếu</Link>
            <Link to="ghe" style={styles.navLink}>Quản lý ghế</Link>
            
          </nav>
        </div>

        <div style={styles.content}>
          <h2 style={styles.greeting}>Chào mừng bạn đến với hệ thống Quản lý Phim Doremi Cinema</h2>
          <Outlet />
        </div>
      </div>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />

      <style>{`
        /* Header Styles */
        
        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 1rem;
        }
        .site-logo {
          font-size: 1.7rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #fff;
        }
        .logo-red {
          color: #e53935;
        }
        .main-nav {
          flex-grow: 1;
          margin-left: 60rem;
        }
         .nav-links {
          display: flex;
          list-style: none;
          align-items: center;
          margin-left: auto; 
        }
        .nav-links li {
          margin: 0 0.2rem;
        }
        .plain-links a {
          background: none !important;
          border: none !important;
          padding: 0.7rem 0.7rem;
          border-radius: 0;
          transition: color 0.2s;
        }
        .plain-links a:hover, .plain-links a:focus {
          background: none !important;
          color: #e53935;
        }
        .greeting {
          font-size: 1rem;
          font-weight: 700;
          color: rgb(45, 163, 53);
          text-shadow: 0 0 10px #35E547, 0 1px 0 #fff;
          letter-spacing: .5px;
        }
        .logout-button {
          background: linear-gradient(90deg,rgb(53, 229, 71) 60%,rgb(153, 255, 167) 100%);
          color: rgb(27, 94, 32);
          border: none;
          padding: 0.25rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(229,35,53,.18);
          transition: background .3s, box-shadow .3s, transform .2s;
        }
        .logout-button:hover {
          background: linear-gradient(90deg, #b71c1c 60%, #e57373 100%);
          box-shadow: 0 6px 20px rgba(183, 28, 28, .85);
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .nav-links {
            flex-direction: column;
            margin: 1rem 0;
          }
          .nav-links li {
            margin: .5rem 0;
          }
          .greeting, .logout-button {
            font-size: 1.2rem;
            padding: .8rem;
          }
        }
      `}</style>
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