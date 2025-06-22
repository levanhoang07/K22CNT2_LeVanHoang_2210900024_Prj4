import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";

// Hook hiệu ứng cuộn hiện nội dung
function useInView(threshold = 0.15) {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function About() {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isLogoutHover, setIsLogoutHover] = useState(false);
  const [soLuongVe, setSoLuongVe] = useState(0);

  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();

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
          <span className="site-logo">DOREMI <span className="logo-red">CINEMA</span></span>
          <div
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setIsMenuOpen(!isMenuOpen)}}
          >
            <span></span><span></span><span></span>
          </div>
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-links plain-links">
              <li><Link to="/">Trang Chủ</Link></li>
              <li><Link to="/locations">Cụm rạp</Link></li>
              <li><Link to="/about">Giới Thiệu</Link></li>
              <li><Link to="/contact">Liên Hệ</Link></li>
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
                      onMouseEnter={() => setIsLogoutHover(true)}
                      onMouseLeave={() => setIsLogoutHover(false)}
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
          <h1>Về <span className="logo-red">Doremi Cinema</span></h1>
          <p>Khám phá không gian điện ảnh hiện đại, dịch vụ tận tâm và sứ mệnh kết nối cộng đồng yêu phim!</p>
        </div>
      </section>

      <main className="main-content">
        <section className="about-section">
          <div
            ref={ref1}
            className={`about-row ${inView1 ? 'about-inview' : ''}`}
          >
            <div className="about-img about-img-left">
              <img
                src="https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Không gian rạp Doremi Cinema"
              />
            </div>
            <div className="about-text">
              <h1 className="about-title">
                Giới Thiệu Về <span className="logo-red">Doremi Cinema</span>
              </h1>
              <p>
                <strong>Doremi Cinema</strong> tự hào là hệ thống rạp chiếu phim hiện đại hàng đầu, nơi mang đến trải nghiệm giải trí đỉnh cao với hình ảnh sắc nét và âm thanh sống động, giúp bạn đắm chìm vào từng khung cảnh của bộ phim yêu thích.
              </p>
              <p>
                Chúng tôi không chỉ cập nhật liên tục những bộ phim bom tấn mới nhất, mà còn cung cấp dịch vụ đặt vé nhanh chóng, tiện lợi giúp tiết kiệm thời gian, đồng thời tạo ra không gian thoải mái, sang trọng để bạn và gia đình có thể tận hưởng trọn vẹn những phút giây giải trí.
              </p>
              <p>
                Bên cạnh đó, Doremi Cinema còn thường xuyên tổ chức các chương trình ưu đãi hấp dẫn dành riêng cho khách hàng thân thiết, mong muốn mang đến nhiều hơn những giá trị tuyệt vời cho cộng đồng yêu điện ảnh.
              </p>
              <p>
                Với niềm tin rằng điện ảnh là cầu nối gắn kết mọi người, chúng tôi luôn không ngừng nỗ lực để tạo nên những khoảnh khắc đáng nhớ, là nơi bạn và những người thân yêu có thể sẻ chia cảm xúc và kỷ niệm.
              </p>
              <p>
                <em>Cảm ơn bạn đã lựa chọn Doremi Cinema – Nơi cảm xúc thăng hoa và từng khoảnh khắc trở nên ý nghĩa!</em>
              </p>
            </div>
          </div>

          <div
            ref={ref2}
            className={`about-row about-row-reverse ${inView2 ? 'about-inview' : ''}`}
          >
            <div className="about-img about-img-right">
              <img
                src="https://images.pexels.com/photos/8537319/pexels-photo-8537319.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Khán giả tại Doremi Cinema"
              />
            </div>
            <div className="about-text">
              <h2 className="about-title">
                Trải Nghiệm Đẳng Cấp & Sứ Mệnh
              </h2>
              <div className="about-feature-list">
                <p>
                  <strong>Tầm nhìn:</strong> Trở thành điểm đến giải trí điện ảnh hàng đầu, nơi mọi khách hàng đều cảm nhận được sự khác biệt về chất lượng dịch vụ, công nghệ và không gian.
                </p>
                <p>
                  <strong>Sứ mệnh:</strong> Mang đến trải nghiệm điện ảnh tuyệt vời, kết nối cộng đồng yêu phim, lan tỏa cảm xúc tích cực và sáng tạo cho mọi thế hệ.
                </p>
                <ul>
                  <p>Không gian hiện đại, phòng chiếu chuẩn quốc tế</p>
                  <li>Đội ngũ nhân viên thân thiện, chuyên nghiệp</li>
                  <li>Dịch vụ đặt vé, thanh toán tiện lợi</li>
                  <li>Nhiều ưu đãi hấp dẫn cho thành viên</li>
                </ul>
                <p>
                  <strong>Hãy đến và cảm nhận sự khác biệt tại Doremi Cinema!</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER giữ nguyên */}
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
              {/* ...icon SVG như TrangChu.jsx... */}
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
        /* ABOUT SECTION (giữ nguyên hiệu ứng cuộn) */
        .about-section {
          padding: 3rem 0 4rem 0;
        }
        .about-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
        }
        .about-inview {
          opacity: 1;
          transform: none;
        }
        .about-row-reverse {
          flex-direction: row-reverse;
        }
        .about-img {
          flex: 1 1 320px;
          min-width: 260px;
          max-width: 400px;
        }
        .about-img img {
          width: 100%;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }
        .about-text {
          flex: 2 1 400px;
          color: #fff;
        }
        .about-title {
          color: #e53935;
          font-size: 1.5rem;
          margin-bottom: 1.2rem;
        }
        .about-feature-list ul {
          margin: 0.7rem 0 0.7rem 1.2rem;
          padding: 0;
          color: #fff;
        }
        .about-feature-list li {
          margin-bottom: 0.5rem;
          font-size: 1.08rem;
        }
        .about-section p {
          color: #fff;
          font-size: 1.1rem;
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
          margin-left: 3rem;
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
          .about-row {
            flex-direction: column !important;
            gap: 1.5rem;
          }
        }
        @media (max-width: 600px) {
          .about-row {
            flex-direction: column !important;
            gap: 1rem;
          }
          .about-img,
          .about-text {
            min-width: 0;
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}