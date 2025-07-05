import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export default function QuanTri() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [logoutHover, setLogoutHover] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Mở menu"
          >
            <span className="sidebar-toggle-icon">&#9776;</span>
          </button>
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
                      onMouseEnter={() => setLogoutHover(true)}
                      onMouseLeave={() => setLogoutHover(false)}
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

      {/* Sidebar */}
      <div className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <h2 className="sidebar-title">🎬 Doremi Cinema</h2>
        <nav className="sidebar-nav">
          <Link to="nguoidung" className="sidebar-link" onClick={() => setSidebarOpen(false)}>Quản lý người dùng</Link>
          <Link to="phim" className="sidebar-link" onClick={() => setSidebarOpen(false)}>Quản lý phim</Link>
          <Link to="vedat" className="sidebar-link" onClick={() => setSidebarOpen(false)}>Quản lý vé đặt</Link>
          <Link to="thanhtoan" className="sidebar-link" onClick={() => setSidebarOpen(false)}>Quản lý thanh toán</Link>
          <Link to="phongchieu" className="sidebar-link" onClick={() => setSidebarOpen(false)}>Quản lý phòng chiếu</Link>
          <Link to="suatchieu" className="sidebar-link" onClick={() => setSidebarOpen(false)}>Quản lý suất chiếu</Link>
          <Link to="ghe" className="sidebar-link" onClick={() => setSidebarOpen(false)}>Quản lý ghế</Link>
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content */}
      <div className="admin-content">
        <h2 className="admin-greeting">Chào mừng bạn đến với hệ thống Quản lý Phim Doremi Cinema</h2>
        <Outlet />
      </div>

      <style>{`
        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 1rem;
        }
        .sidebar-toggle {
          background: none;
          border: none;
          font-size: 2rem;
          color: #2e7d32;
          cursor: pointer;
          display: none;
        }
        .sidebar-toggle:focus {
          outline: 2px solid #2e7d32;
        }
        .sidebar-toggle-icon {
          font-size: 2rem;
        }
        .main-nav {
          flex-grow: 1;
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
        .sidebar {
          width: 250px;
          background: linear-gradient(180deg, #c8e6c9, #a5d6a7);
          color: #1b5e20;
          padding: 20px;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 1200;
          transition: transform 0.3s ease;
        }
        .sidebar-title {
          font-size: 24px;
          margin-bottom: 20px;
          font-weight: bold;
          border-bottom: 2px solid #81c784;
          padding-bottom: 10px;
          color: #2e7d32;
          text-align: center;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .sidebar-link {
          text-decoration: none;
          color: #1b5e20;
          font-size: 18px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 15px;
          border-radius: 8px;
          transition: background-color 0.3s, transform 0.2s;
          background: rgba(255, 255, 255, 0.8);
        }
        .sidebar-link:hover, .sidebar-link:focus {
          background: #a5d6a7;
          color: #2e7d32;
          transform: translateX(4px);
        }
        .admin-content {
          margin-left: 250px;
          padding: 40px;
          width: calc(100% - 250px);
          background: rgba(255, 255, 255, 0.95);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .admin-greeting {
          font-size: 28px;
          font-weight: bold;
          color: #2e7d32;
          margin-bottom: 30px;
          text-align: center;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }
        /* Overlay for mobile sidebar */
        .sidebar-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.25);
          z-index: 1100;
        }
        /* MOBILE STYLES */
        @media (max-width: 900px) {
          .admin-content {
            margin-left: 0;
            width: 100%;
            padding: 20px 5px;
          }
          .sidebar {
            transform: translateX(-100%);
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            z-index: 1200;
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .sidebar-toggle {
            display: block;
          }
        }
        @media (max-width: 600px) {
          .sidebar-title {
            font-size: 18px;
            padding-bottom: 6px;
          }
          .sidebar-link {
            font-size: 16px;
            padding: 10px 8px;
          }
          .admin-greeting {
            font-size: 20px;
            margin-bottom: 18px;
          }
          .header-container {
            flex-direction: column;
            align-items: flex-start;
            padding: 0.5rem 0.5rem;
          }
          .greeting, .logout-button {
            font-size: 1rem;
            padding: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}