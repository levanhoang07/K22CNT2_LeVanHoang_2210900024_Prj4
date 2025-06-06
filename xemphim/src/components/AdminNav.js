import React, { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function AdminNav() {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isLogoutHover, setLogoutHover] = useState(false);

  // Nếu không phải admin, chuyển hướng về trang đăng nhập quản trị
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adminLinks = [
    { path: "/quantri", label: "Trang quản trị" },
    { path: "/quantri/phim", label: "Quản lý phim" },
    { path: "/quantri/vedat", label: "Quản lý vé" },
    { path: "/quantri/user", label: "Quản lý người dùng" },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link
          to="/"
          style={{
            ...styles.logoLink,
            color: hoveredLink === "logo" ? "#a5d6a7" : "#fff",
            textShadow: hoveredLink === "logo" ? "0 0 10px #a5d6a7" : "none",
          }}
          onMouseEnter={() => setHoveredLink("logo")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <span style={{ fontSize: "2.1rem", marginRight: 8 }}>🛠️</span>
          <span style={styles.logoText}>Admin Cinema</span>
        </Link>
      </div>

      <div style={styles.navLinks}>
        <span style={styles.greeting}>Quản trị: {user.ho_ten}</span>
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
        {adminLinks.map(({ path, label }) => (
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
        ))}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.2rem 3rem",
    background: "linear-gradient(90deg, #0d47a1 60%, #42a5f5 100%)",
    color: "#fff",
    boxShadow: "0 4px 24px 0 rgba(33,150,243,0.18), 0 1.5px 0 #1976d2 inset",
    fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
    fontWeight: "500",
    userSelect: "none",
  },
  logo: {
    fontSize: "2.1rem",
    fontWeight: "800",
    letterSpacing: "2.5px",
    cursor: "pointer",
    background: "linear-gradient(90deg, #fff 60%, #42a5f5 120%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textShadow: "0 2px 16px #42a5f5, 0 1px 0 #fff",
  },
  logoLink: {
    color: "#fff",
    textDecoration: "none",
    transition: "color 0.4s, text-shadow 0.4s",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "800",
    letterSpacing: "2.5px",
    textShadow: "0 2px 16px #42a5f5, 0 1px 0 #fff",
  },
  logoText: {
    fontWeight: "800",
    fontSize: "2.1rem",
    letterSpacing: "2.5px",
    background: "linear-gradient(90deg, #fff 60%, #42a5f5 120%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "18px",
    padding: "6px 24px",
    boxShadow: "0 2px 12px 0 rgba(33,150,243,0.10)",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.15rem",
    fontWeight: "700",
    padding: "0.85rem 1.4rem",
    borderRadius: "12px",
    transition: "background 0.3s, color 0.2s, box-shadow 0.2s, transform 0.2s",
    cursor: "pointer",
    background: "linear-gradient(90deg, rgba(33,150,243,0.08) 0%, rgba(255,255,255,0.01) 100%)",
    border: "none",
    boxShadow: "0 1px 6px 0 rgba(33,150,243,0.08)",
    margin: "0 2px",
    position: "relative",
    overflow: "hidden",
  },
  navLinkHover: {
    background: "linear-gradient(90deg, #1976d2 60%, #90caf9 100%)",
    color: "#fff",
    boxShadow: "0 4px 18px 0 #1976d2, 0 1.5px 0 #fff inset",
    textShadow: "0 0 12px #fff, 0 0 6px #1976d2",
    transform: "scale(1.08) translateY(-2px)",
  },
  greeting: {
    fontSize: "1.15rem",
    fontWeight: "700",
    marginRight: "18px",
    color: "#e3f2fd",
    textShadow: "0 0 10px #1976d2, 0 1px 0 #fff",
    letterSpacing: "0.5px",
    background: "linear-gradient(90deg, #1976d2 40%, #fff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  logoutButton: {
    background: "linear-gradient(90deg, #1976d2 60%, #90caf9 100%)",
    color: "#fff",
    border: "none",
    padding: "12px 28px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1.08rem",
    fontWeight: "700",
    boxShadow: "0 4px 15px rgba(33,150,243,0.18)",
    transition: "background 0.3s, box-shadow 0.3s, transform 0.2s",
  },
  logoutButtonHover: {
    background: "linear-gradient(90deg, #0d47a1 60%, #64b5f6 100%)",
    boxShadow: "0 6px 20px rgba(13, 71, 161, 0.85)",
    transform: "scale(1.05)",
  },
};