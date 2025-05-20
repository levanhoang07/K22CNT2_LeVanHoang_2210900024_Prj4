// src/components/Navigation.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isLogoutHover, setLogoutHover] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinksData = [
    { path: "/dangnhap", label: "Đăng nhập" },
    { path: "/dangky", label: "Đăng ký" },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link
          to="/"
          style={{
            ...styles.logoLink,
            color: hoveredLink === "logo" ? "#a5d6a7" : "#fff",
          }}
          onMouseEnter={() => setHoveredLink("logo")}
          onMouseLeave={() => setHoveredLink(null)}
        >
         🎬Doremi Cinema
        </Link>
      </div>
      <div style={styles.navLinks}>
        {user ? (
          <>
            <span style={styles.greeting}>Xin chào, {user.ho_ten}</span>
            <button
              onClick={handleLogout}
              style={{
                ...styles.logoutButton,
                ...(isLogoutHover ? styles.logoutButtonHover : {}),
              }}
              onMouseEnter={() => setLogoutHover(true)}
              onMouseLeave={() => setLogoutHover(false)}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          navLinksData.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              style={{
                ...styles.navLink,
                ...(hoveredLink === path ? styles.navLinkHover : {}),
              }}
              onMouseEnter={() => setHoveredLink(path)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {label}
            </Link>
          ))
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
    padding: "15px 40px",
    background: "linear-gradient(135deg, #0f3443 0%, #34e89e 100%)",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "1.5px",
  },
  logoLink: {
    color: "#fff",
    textDecoration: "none",
    transition: "color 0.3s ease",
    cursor: "pointer",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },
  navLink: {
    color: "#e0e0e0",
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: "600",
    padding: "8px 14px",
    borderRadius: "6px",
    transition: "background-color 0.3s ease, color 0.3s ease",
    cursor: "pointer",
  },
  navLinkHover: {
    backgroundColor: "#34e89e", 
    color: "#0f3443", 
  },
  greeting: {
    fontSize: "17px",
    fontWeight: "600",
    marginRight: "12px",
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "9px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow: "0 3px 8px rgba(211, 47, 47, 0.6)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  logoutButtonHover: {
    backgroundColor: "#b71c1c",
    boxShadow: "0 5px 15px rgba(183, 28, 28, 0.8)",
  },
};
