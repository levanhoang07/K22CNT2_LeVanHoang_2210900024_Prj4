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
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
  onMouseEnter={() => setHoveredLink("logo")}
  onMouseLeave={() => setHoveredLink(null)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 64 64"
    fill="url(#grad1)"
    stroke="#a5d6a7"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34e89e" />
        <stop offset="100%" stopColor="#0f3443" />
      </linearGradient>
    </defs>
    <rect x="8" y="20" width="40" height="24" rx="5" ry="5" fill="url(#grad1)" />
    <circle cx="20" cy="32" r="8" fill="#fff" stroke="none" />
    <circle cx="20" cy="32" r="5" fill="url(#grad1)" />
    <path d="M50 22 L58 18 L58 46 L50 42" fill="url(#grad1)" />
    <circle cx="50" cy="32" r="6" fill="none" />
  </svg>
  <span style={{ fontWeight: "700", fontSize: "24px" }}>Doremi Cinema</span>
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
              aria-label="Đăng xuất"
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
    padding: "20px 50px",
    background: "linear-gradient(135deg, #0f3443 0%, #34e89e 100%)",
    color: "#fff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
    fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: "500",
    userSelect: "none",
  },
  logo: {
    fontSize: "30px",
    fontWeight: "700",
    letterSpacing: "2px",
    cursor: "pointer",
  },
  logoLink: {
    color: "#fff",
    textDecoration: "none",
    transition: "color 0.4s ease, text-shadow 0.4s ease",
    display: "inline-block",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  navLink: {
    color: "#d0d0d0",
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: "600",
    padding: "10px 18px",
    borderRadius: "8px",
    transition:
      "background-color 0.35s cubic-bezier(0.4, 0, 0.2, 1), color 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease",
    cursor: "pointer",
  },
  navLinkHover: {
    backgroundColor: "#34e89e",
    color: "#0f3443",
    boxShadow: "0 4px 12px rgba(52, 232, 158, 0.6)",
  },
  greeting: {
    fontSize: "17px",
    fontWeight: "600",
    marginRight: "18px",
    color: "#e0f2f1",
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    boxShadow: "0 4px 15px rgba(211, 47, 47, 0.7)",
    transition:
      "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
  },
  logoutButtonHover: {
    backgroundColor: "#b71c1c",
    boxShadow: "0 6px 20px rgba(183, 28, 28, 0.85)",
    transform: "scale(1.05)",
  },
};
