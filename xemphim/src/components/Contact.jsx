  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';

  export default function Contact() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <>
        <header className="header">
          <div className="header-container">
            <div
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsMenuOpen(!isMenuOpen);
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
              <ul className="nav-links">
                <li><Link to="/">Trang Chủ</Link></li>
                <li><Link to="/locations">Cụm rạp</Link></li>
                <li><Link to="/about">Giới Thiệu</Link></li>
                <li><Link to="/contact">Liên Hệ</Link></li>
              </ul>
            </nav>

            <div className="header-actions">
              <Link to="/giove" className="cart-icon" title="Giỏ vé của bạn">
                <span className="icon">🛒</span>
                <span className="badge">0</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="contact-container">
          <h1>Liên Hệ Với Chúng Tôi</h1>
          <div className="contact-content">
            <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với Doremi Cinema qua các kênh sau:</p>

            <div className="contact-info-grid">
              <div className="contact-info-item">
                <i className="fas fa-map-marker-alt icon"></i>
                <div>
                  <h3>Địa chỉ</h3>
                  <p>28A Lê Trọng Tấn, Hà Đông, Hà Nội</p>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-envelope icon"></i>
                <div>
                  <h3>Email</h3>
                  <p><a href="mailto:support@doremicinema.com">support@doremicinema.com</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-phone-alt icon"></i>
                <div>
                  <h3>Điện thoại</h3>
                  <p><a href="tel:0982121680">0982 121 680</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-clock icon"></i>
                <div>
                  <h3>Giờ mở cửa</h3>
                  <p>09:00 - 22:00 (Thứ 2 - Chủ nhật)</p>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fab fa-facebook-f icon"></i>
                <div>
                  <h3>Fanpage Facebook</h3>
                  <p>
                    <a href="https://www.facebook.com/doremicinema" target="_blank" rel="noopener noreferrer">
                      facebook.com/doremicinema
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <h2>Bản Đồ</h2>
            <div className="map-container">
              <iframe
                title="Bản đồ Doremi Cinema"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.378420578216!2d105.7462676!3d20.9710027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134531d639eaaab%3A0x1b23ce48070fe314!2zMjhBIMSQLiBMw6ogVHLhu5NuZyBU4bqnbiwgRMawxqFuZyBLaW5oLCBIw6AgxJDhu5FuZywgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1715766261140!5m2!1svi!2s"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </main>

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
                <li><Link to="/locations">Rạp Phim</Link></li>
                <li><Link to="/about">Giới Thiệu</Link></li

  >
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
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.252 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
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

    <style>{`
    /* Reset & Base Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      background: #fff;
      color: #2e7d32;
    }

    /* Header Styles */
    .header {
      background: linear-gradient(135deg, #0f3443 0%, #34e89e 100%);
      padding: 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem 1rem;
    }

    .main-nav {
      flex-grow: 1;
      margin-left: 2rem;
    }

    .nav-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-links li {
      position: relative;
      margin: 0;
    }

    .nav-links a {
      display: block;
      text-decoration: none;
      color: white;
      font-size: 1rem;
      padding: 0.75rem 1.25rem;
      font-weight: 500;
      transition: all 0.3s ease;
      border-radius: 4px;
    }

    .nav-links a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    /* Header actions */
    .header-actions {
      display: flex;
      align-items: center;
    }

    .cart-icon {
      position: relative;
      font-size: 1.5rem;
      color: white;
      margin-right: 1rem;
      text-decoration: none;
    }

    .cart-icon .badge {
      position: absolute;
      top: -6px;
      right: -10px;
      background: #f44336;
      color: white;
      border-radius: 50%;
      padding: 2px 6px;
      font-size: 0.7rem;
      font-weight: 700;
    }

    /* Mobile Menu Toggle */
    .mobile-menu-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-around;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .mobile-menu-toggle span {
      display: block;
      width: 100%;
      height: 3px;
      background: white;
      border-radius: 3px;
      transition: all 0.3s ease;
    }

    /* Responsive Header */
    @media (max-width: 768px) {
      .main-nav {
        position: fixed;
        top: 56px;
        left: 0;
        width: 100%;
        height: 100vh;
        background: #0f3443;
        clip-path: circle(0% at 100% 0);
        transition: clip-path 0.6s ease-in-out;
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

      .nav-links a {
        font-size: 1.5rem;
        padding: 1rem;
      }

      .header-actions {
        display: none;
      }

      .mobile-menu-toggle {
        display: flex;
      }
    }

    /* Locations container */
    .locations-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .locations-container h1 {
      color: #34e89e;
      font-size: 2rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    .locations-intro {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 1rem; /* Matches Contact's paragraph size */
      color: #555;
      line-height: 1.8;
    }

    .locations-list {
      list-style: none;
      padding: 0;
    }

    .location-item {
      display: flex;
      gap: 15px; /* Matches Contact's gap in contact-info-item */
      margin-bottom: 30px; /* Matches Contact's margin-bottom for contact-info-grid */
      background: #f9f9f9; /* Matches Contact's contact-info-item background */
      border-radius: 10px; /* Matches Contact's contact-info-item border-radius */
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      padding: 15px 20px; /* Matches Contact's contact-info-item padding */
      transition: box-shadow 0.3s ease, transform 0.3s ease; /* Matches Contact's transitions */
    }

    .location-item:hover {
      transform: translateY(-6px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15); /* Matches Contact's hover shadow */
    }

    .location-info {
      flex: 1;
      padding: 0; /* Remove extra padding since parent has padding */
    }

    .location-info h2 {
      font-size: 1.2rem; /* Matches Contact's h3 in contact-info-item */
      color: #0f3443;
      margin-bottom: 6px; /* Matches Contact's h3 margin */
    }

    .location-info p {
      font-size: 1rem; /* Matches Contact's paragraph size */
      color: #555;
      margin: 0; /* Matches Contact's paragraph margin */
      line-height: 1.8; /* Matches Contact's line-height */
    }

    .location-info p strong {
      color: #0f3443;
    }

    .location-image {
      flex-shrink: 0;
      width: 200px; /* Consistent with original, but adjustable */
      height: 150px; /* Consistent with original, but adjustable */
    }

    .location-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 8px; /* Matches Contact's map border-radius */
    }

    /* Footer */
    .footer {
      background: #0f3443;
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

    .footer-section h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #34e89e;
    }

    .footer-section h4 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #34e89e;
    }

    .footer-section p {
      font-size: 0.9rem;
      color: #ddd;
      line-height: 1.8;
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section ul li {
      margin-bottom: 0.5rem;
    }

    .footer-section ul li a {
      color: #ddd;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }

    .footer-section ul li a:hover {
      color: #34e89e;
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .social-icon {
      color: #ddd;
      font-size: 1.5rem;
      transition: color 0.3s ease;
      text-decoration: none;
    }

    .social-icon:hover {
      color: #34e89e;
    }

    .footer-bottom {
      text-align: center;
      padding: 1rem 0;
      margin-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .footer-bottom p {
      font-size: 0.9rem;
      color: #ddd;
    }

    /* Responsive Locations */
    @media (max-width: 768px) {
      .location-item {
        flex-direction: column;
        padding: 15px; /* Slightly less padding for mobile */
      }

      .location-image {
        width: 100%;
        height: 200px; /* Matches original responsive height */
      }

      .footer-container {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .social-links {
        justify-content: center;
      }
    }
  `}</style>
      </>
    );
  }