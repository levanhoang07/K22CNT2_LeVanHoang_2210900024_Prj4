import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function Contact() {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isLogoutHover, setLogoutHover] = useState(false);
  const [soLuongVe, setSoLuongVe] = useState(0);

  const nguoiDungId = user?.nguoidung_id || user?.id;
  useEffect(() => {
    if (!nguoiDungId) {
      setSoLuongVe(0);
      return;
    }
    fetch(`http://localhost:3000/api/vedat?nguoidung_id=${nguoiDungId}`)
      .then(res => res.json())
      .then(data => setSoLuongVe(data.length))
      .catch(() => setSoLuongVe(0));
  }, [nguoiDungId]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-container">
          <span className="site-logo">
            DOREMI <span className="logo-red">CINEMA</span>
          </span>
          <div
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsMenuOpen(!isMenuOpen);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className={`main-nav ${isMenuOpen ? "open" : ""}`}>
            <ul className="nav-links plain-links">
              <li>
                <Link to="/">Trang Chủ</Link>
              </li>
              <li>
                <Link to="/locations">Cụm rạp</Link>
              </li>
              <li>
                <Link to="/about">Giới Thiệu</Link>
              </li>
              <li>
                <Link to="/contact">Liên Hệ</Link>
              </li>
              <li>
                <Link to="/giove" className="cart-icon" title="Giỏ vé của bạn">
                  <span className="icon">🛒</span>
                  <span className="badge">{soLuongVe}</span>
                </Link>
              </li>
              {user && !isAdmin ? (
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
              ) : (
                <>
                  <li>
                    <Link
                      to="/dangnhap"
                      className="nav-link"
                      onMouseEnter={() => setHoveredLink("/dangnhap")}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      Đăng nhập
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dangky"
                      className="nav-link"
                      onMouseEnter={() => setHoveredLink("/dangky")}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      Đăng ký
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Liên Hệ <span className="logo-red">Doremi Cinema</span></h1>
          <p>Chúng tôi luôn sẵn sàng lắng nghe ý kiến và hỗ trợ bạn mọi lúc!</p>
        </div>
      </section>

      {/* CONTACT MAIN */}
      <main className="main-content">
        <section className="contact-section">
          <div className="container">
            <h1 className="contact-title">Liên Hệ Với Chúng Tôi</h1>
            <div className="contact-info-grid">
              <div className="contact-info-item">
                <i className="fas fa-building icon"></i>
                <div>
                  <h3>TRỤ SỞ</h3>
                  <p>Số 28A Lê Trọng Tấn, Phường La Khê, Quận Hà Đông , Tp.Hà Nội</p>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-headset icon"></i>
                <div>
                  <h3>HỖ TRỢ KHÁCH HÀNG</h3>
                  <p>Hotline: <a href="02435199999999">024.35199999999</a></p>
                  <p>Zalo: <a href="https://oa.zalo.me/doremiCinema" target="_blank" rel="noopener noreferrer">https://oa.zalo.me/ttcpqg</a></p>
                  <p>Giờ làm việc: 8:00 - 22:00<br />Tất cả các ngày bao gồm cả Lễ tết</p>
                  <p>Email: <a href="mailto:support@doremiCinema.vn">support@doremiCinema.vn</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-bullhorn icon"></i>
                <div>
                  <h3>LIÊN HỆ QUẢNG CÁO, TỔ CHỨC SỰ KIỆN, THUÊ RẠP</h3>
                  <p>Phòng dịch vụ</p>
                  <p>Hotline: <a href="tel:0243456789">024.3456789</a></p>
                  <p>Email: <a href="mailto:Booking@doremiCinema.vn">Booking@doremiCinema.vn</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-ticket-alt icon"></i>
                <div>
                  <h3>LIÊN HỆ MUA VÉ HỢP ĐỒNG</h3>
                  <p>Phòng Chiếu phim và Trưng bày Điện Ảnh</p>
                  <p>Hotline: <a href="tel:02435888888">024.35888888</a></p>
                  <p>Email: <a href="mailto:contact@doremiCinema.vn">contact@doremiCinema.vn</a></p>
                </div>
              </div>
            </div>
            <h2 className="contact-map-title">Bản Đồ</h2>
            <div className="map-container">
              <iframe
                title="Bản đồ Doremi Cinema"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.624687364105!2d105.7592438!3d20.9630515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453ef854da745%3A0x91291de5392ac9ae!2zVMO0YSBUaMO6eSBM4buRdCBUb3dlcg!5e0!3m2!1svi!2s!4v1717320000000!5m2!1svi!2s"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Doremi Cinema</h3>
            <p>Tại đây, mỗi suất chiếu không chỉ đơn thuần là một bộ phim – mà là một hành trình cảm xúc sống động, nơi bạn được đắm chìm trong không gian hiện đại, thưởng thức những kiệt tác điện ảnh đỉnh cao và cảm nhận dịch vụ đẳng cấp với sự chăm sóc chu đáo đến từng chi tiết.</p>
          </div>
          <div className="footer-section">
            <h4>Liên kết nhanh</h4>
            <ul>
              <li><Link to="/">Trang Chủ</Link></li>
              <li><Link to="/locations">Cụm Rạp</Link></li>
              <li><Link to="/about">Giới Thiệu</Link></li>
              <li><Link to="/contact">Liên Hệ</Link></li>
              <li><Link to="/dangnhap">Đăng Nhập</Link></li>
              <li><Link to="/dangky">Đăng Ký</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Liên hệ</h4>
            <p>Email: support@doremicinema.com</p>
            <p>Điện thoại: 0982121680</p>
            <p>Địa chỉ: Tòa nhà Thủy Lợi 28A Lê Trọng Tấn, Hà Đông, Hà Nội</p>
          </div>
          <div className="footer-section">
            <h4>Theo dõi chúng tôi</h4>
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Doremi Cinema. Nơi dâng trào cảm xúc.</p>
        </div>
      </footer>

      {/* CSS giống Locations.jsx */}
      <style>{`
        .greeting,
        .header-actions,
        .nav-links li,
        .nav-links.plain-links a {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          vertical-align: middle;
        }
        body {
          font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
          background: #555555;
          color: #222;
        }
        .main-content {
          background: rgb(45, 41, 41);
        }
        .header {
          background: #111;
          color: #fff;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.18);
        }
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
          margin-left: 2rem;
        }
        .nav-links {
          display: flex;
          list-style: none;
          align-items: center;
        }
        .nav-links li {
          margin: 0 0.2rem;
        }
        .nav-links a {
          color: #fff;
          text-decoration: none;
          font-size: 1rem;
          padding: 0.7rem 1.2rem;
          border-radius: 8px;
          transition: background 0.3s, color 0.2s;
        }
        .nav-links a:hover, .nav-links a:focus {
          background: #e53935;
          color: #fff;
        }
        .nav-links.plain-links a {
          background: none !important;
          border: none !important;
          padding: 0.7rem 0.7rem;
          border-radius: 0;
          transition: color 0.2s;
        }
        .nav-links.plain-links a:hover, .nav-links.plain-links a:focus {
          background: none !important;
          color: #e53935;
        }
        .greeting {
          font-size: 1rem;
          font-weight: 700;
          color: #fffde7;
          text-shadow: 0 0 10px #e53935, 0 1px 0 #fff;
          letter-spacing: 0.5px;
          padding: 0.7rem 1.2rem;
        }
        .logout-button {
          background: linear-gradient(90deg, #e53935 60%, #ffb199 100%);
          color: #fff;
          border: none;
          padding: 0.7rem 1.2rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(229,57,53,0.18);
          transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
        }
        .logout-button:hover {
          background: linear-gradient(90deg, #b71c1c 60%, #e57373 100%);
          box-shadow: 0 6px 20px rgba(183, 28, 28, 0.85);
          transform: scale(1.05);
        }
        .header-actions {
          display: flex;
          align-items: center;
        }
        .cart-icon {
          position: relative;
          font-size: 1.5rem;
          color: #fff;
          margin-right: 1rem;
          text-decoration: none;
          transition: transform 0.2s;
        }
        .cart-icon:hover {
          transform: scale(1.15) rotate(-8deg);
        }
        .cart-icon .badge {
          position: absolute;
          top: -0px;
          right: -0px;
          background: #e53935;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 28px;
          height: 28px;
          cursor: pointer;
        }
        .mobile-menu-toggle span {
          display: block;
          width: 100%;
          height: 3px;
          background: #fff;
          border-radius: 3px;
          margin-bottom: 4px;
        }
        .mobile-menu-toggle span:last-child {
          margin-bottom: 0;
        }
        @media (max-width: 768px) {
          .main-nav {
            position: fixed;
            top: 56px;
            left: 0;
            width: 100%;
            height: 100vh;
            background: #111;
            clip-path: circle(0% at 100% 0);
            transition: clip-path 0.6s;
            pointer-events: none;
            z-index: 999;
          }
          .main-nav.open {
            clip-path: circle(150% at 100% 0);
            pointer-events: auto;
          }
          .nav-links {
            flex-direction: column;
            margin: 3rem 0 0 0;
          }
          .nav-links li {
            margin: 0.5rem 0;
            text-align: center;
          }
          .nav-links a, .logout-button {
            font-size: 1.5rem;
            padding: 1rem;
          }
          .greeting {
            font-size: 1.5rem;
            padding: 1rem;
          }
          .header-actions {
            display: none;
          }
          .mobile-menu-toggle {
            display: flex;
          }
          .hero-content h1 {
            font-size: 1.3rem;
          }
        }
        /* HERO BANNER */
        .hero-banner {
          position: relative;
          background: url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
          min-height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(17,17,17,0.7);
        }
        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: #fff;
          padding: 2.5rem 1rem 2rem 1rem;
        }
        .hero-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }
        .hero-content p {
          font-size: 1.1rem;
          margin-bottom: 0;
          color: #fff;
        }
        /* CONTACT SECTION */
        .contact-section {
          padding: 3rem 0 4rem 0;
        }
        .contact-title {
          color: #e53935;
          font-size: 1.5rem;
          margin-bottom: 2rem;
          text-align: center;
        }
        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem 2.5rem;
          margin-bottom: 2.5rem;
        }
        .contact-info-item {
          display: flex;
          align-items: flex-start;
          background: rgba(180, 173, 173, 0.10);
          border-radius: 16px;
          padding: 1.3rem 1.5rem;
          box-shadow: 0 2px 16px rgba(144, 54, 54, 0.08);
          min-height: 140px;
        }
        .contact-info-item .icon {
          font-size: 2.2rem;
          color: #e53935;
          margin-right: 1.2rem;
          min-width: 2.2rem;
        }
        .contact-info-item h3 {
          margin: 0 0 0.5rem 0;
          color: #e53935;
          font-size: 1.1rem;
        }
        .contact-info-item p, .contact-info-item a {
          color: #fff;
          font-size: 1.05rem;
          margin-bottom: 0.2rem;
          text-decoration: none;
        }
        .contact-info-item a:hover {
          color: #e53935;
          text-decoration: underline;
        }
        .contact-map-title {
          color: #e53935;
          font-size: 1.2rem;
          margin: 2.5rem 0 1rem 0;
          text-align: center;
        }
        .map-container {
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(144, 54, 54, 0.08);
        }
        /* FOOTER */
        .footer {
          background: #111;
          color: white;
          padding: 2rem 0;
          margin-top: 3rem;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          padding: 0 1rem;
        }
        .footer-section h3, .footer-section h4 {
          font-weight: 700;
          color: #e53935;
          margin-bottom: 1rem;
        }
        .footer-section p {
          font-size: 0.98rem;
          color: #e0e0e0;
          line-height: 1.8;
        }
        .footer-section ul {
          list-style: none;
        }
        .footer-section ul li {
          margin-bottom: 0.5rem;
        }
        .footer-section ul li a {
          color: #e0e0e0;
          text-decoration: none;
          font-size: 1rem;
          border-radius: 6px;
          padding: 0.2rem 0.5rem;
          transition: color 0.3s, background 0.2s;
        }
        .footer-section ul li a:hover {
          color: #e53935;
          background: rgba(229,57,53,0.08);
        }
        .social-links {
          display: flex;
          gap: 1.1rem;
        }
        .social-icon {
          color: #e0e0e0;
          font-size: 1.7rem;
          transition: color 0.3s, transform 0.2s;
          text-decoration: none;
          border-radius: 50%;
          padding: 0.2rem;
        }
        .social-icon:hover {
          color: #e53935;
          background: rgba(229,57,53,0.10);
          transform: scale(1.18) rotate(-8deg);
        }
        .footer-bottom {
          text-align: center;
          padding: 1rem 0 0.5rem 0;
          margin-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .footer-bottom p {
          font-size: 0.98rem;
          color: #bdbdbd;
        }
        @media (max-width: 1024px) {
          .contact-info-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .contact-info-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </>
  );
}