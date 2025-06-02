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
            textShadow: hoveredLink === "logo" ? "0 0 10px #a5d6a7" : "none",
          }}
          onMouseEnter={() => setHoveredLink("logo")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <span style={{ fontSize: "2.1rem", marginRight: 8 }}>🎥</span>
          <span style={styles.logoText}>Doremi Cinema</span>
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
    padding: "1.2rem 3rem",
    background: "linear-gradient(90deg, #111 60%, #e53935 100%)",
    color: "#fff",
    boxShadow: "0 4px 24px 0 rgba(229,57,53,0.18), 0 1.5px 0 #e53935 inset",
    fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
    fontWeight: "500",
    userSelect: "none",
  },
  logo: {
    fontSize: "2.1rem",
    fontWeight: "800",
    letterSpacing: "2.5px",
    cursor: "pointer",
    background: "linear-gradient(90deg, #fff 60%, #e53935 120%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textShadow: "0 2px 16px #e53935, 0 1px 0 #fff",
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
    textShadow: "0 2px 16px #e53935, 0 1px 0 #fff",
  },
  logoText: {
    fontWeight: "800",
    fontSize: "2.1rem",
    letterSpacing: "2.5px",
    background: "linear-gradient(90deg, #fff 60%, #e53935 120%)",
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
    boxShadow: "0 2px 12px 0 rgba(229,57,53,0.10)",
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
    background: "linear-gradient(90deg, rgba(229,57,53,0.08) 0%, rgba(255,255,255,0.01) 100%)",
    border: "none",
    boxShadow: "0 1px 6px 0 rgba(229,57,53,0.08)",
    margin: "0 2px",
    position: "relative",
    overflow: "hidden",
  },
  navLinkHover: {
    background: "linear-gradient(90deg, #e53935 60%, #ffb199 100%)",
    color: "#fff",
    boxShadow: "0 4px 18px 0 #e53935, 0 1.5px 0 #fff inset",
    textShadow: "0 0 12px #fff, 0 0 6px #e53935",
    transform: "scale(1.08) translateY(-2px)",
  },
  greeting: {
    fontSize: "1.15rem",
    fontWeight: "700",
    marginRight: "18px",
    color: "#fffde7",
    textShadow: "0 0 10px #e53935, 0 1px 0 #fff",
    letterSpacing: "0.5px",
    background: "linear-gradient(90deg, #e53935 40%, #fff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  logoutButton: {
    background: "linear-gradient(90deg, #e53935 60%, #ffb199 100%)",
    color: "#fff",
    border: "none",
    padding: "12px 28px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1.08rem",
    fontWeight: "700",
    boxShadow: "0 4px 15px rgba(229,57,53,0.18)",
    transition: "background 0.3s, box-shadow 0.3s, transform 0.2s",
  },
  logoutButtonHover: {
    background: "linear-gradient(90deg, #b71c1c 60%, #e57373 100%)",
    boxShadow: "0 6px 20px rgba(183, 28, 28, 0.85)",
    transform: "scale(1.05)",
  },
};