// src/components/Navigation.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Xóa thông tin người dùng
    navigate("/"); // Chuyển hướng về trang chủ
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>
          Doremi Cinema
        </Link>
      </div>
      <div style={styles.navLinks}>
        {user ? (
          <>
            <span style={styles.greeting}>Xin chào, {user.ho_ten}</span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/dangnhap" style={styles.navLink}>
              Đăng nhập
            </Link>
            <Link to="/dangky" style={styles.navLink}>
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#2e7d32",
    color: "#ffffff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  logoLink: {
    color: "#ffffff",
    textDecoration: "none",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
  greeting: {
    fontSize: "16px",
    fontWeight: "500",
  },
  logoutButton: {
    background: "#d32f2f",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background 0.3s ease",
  },
};
