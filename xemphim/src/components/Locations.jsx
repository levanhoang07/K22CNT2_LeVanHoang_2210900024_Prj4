import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Locations() {
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
            onKeyDown={(e) => { if (e.key === 'Enter') setIsMenuOpen(!isMenuOpen)}}
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

      <main className="locations-container">
        <h1>Hệ Thống Rạp</h1>
        <p className="locations-intro">
          Chúng tôi tự hào có các rạp chiếu hiện đại, tiện nghi và không gian thoải mái tại nhiều thành phố lớn.
          Hãy chọn rạp gần bạn nhất để trải nghiệm điện ảnh đỉnh cao cùng Doremi Cinema!
        </p>
        <ul className="locations-list">
          <li className="location-item">
            <div className="location-image">
              <img src="https://th.bing.com/th/id/OIP.d-rWdo6XTgcHkrqvvwZ_3gHaDt?rs=1&pid=ImgDetMain" alt="Rạp Hà Nội" />
            </div>
            <div className="location-info">
              <h2>Hà Nội</h2>
              <p><strong>Địa chỉ:</strong> Số 25 Vũ Ngọc Phan, Láng Hạ, Đống Đa, Hà Nội</p>
              <p>Rạp chiếu được trang bị công nghệ màn hình lớn, âm thanh sống động, phục vụ đa dạng thể loại phim mới nhất.</p>
            </div>
          </li>

          <li className="location-item">
            <div className="location-image">
              <img src="https://thumbs.dreamstime.com/b/3d-cinema-15318377.jpg" alt="Rạp Vĩnh Phúc" />
            </div>
            <div className="location-info">
              <h2>Vĩnh Phúc</h2>
              <p><strong>Địa chỉ:</strong> Số 88 Hoàng Hoa Thám, Ngọc Thanh, Phúc Yên, Vĩnh Phúc</p>
              <p>Không gian thân thiện, dịch vụ chuyên nghiệp, thuận tiện cho gia đình và nhóm bạn.</p>
            </div>
          </li>

          <li className="location-item">
            <div className="location-image">
              <img src="https://smartschoolsolutions.in/wp-content/uploads/2022/08/pim-pr-img27.webp" alt="Rạp Đà Nẵng" />
            </div>
            <div className="location-info">
              <h2>Đà Nẵng</h2>
              <p><strong>Địa chỉ:</strong> Tầng 4, TTTM Vincom Đà Nẵng, Ngô Quyền, P. An Hải Bắc, Q. Sơn Trà, Tp. Đà Nẵng</p>
              <p>Địa điểm lý tưởng cho các tín đồ điện ảnh, gần trung tâm thành phố, dễ dàng di chuyển.</p>
            </div>
          </li>
        </ul>
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
              <li><Link to="/locations">Cụm rạp</Link></li>
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
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4- egg-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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

        /* Main container */
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
          font-size: 1.1rem;
          color: #555;
        }

        .locations-list {
          list-style: none;
          padding: 0;
        }

        .location-item {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .location-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .location-info {
          flex: 1;
          padding: 1rem;
        }

        .location-info h2 {
          font-size: 1.5rem;
          color: #0f3443;
          margin-bottom: 0.5rem;
        }

        .location-info p {
          font-size: 0.9rem;
          color: #555;
          margin: 0.5rem 0;
        }

        .location-info p strong {
          color: #0f3443;
        }

        .location-image {
          flex-shrink: 0;
          width: 200px;
          height: 150px;
        }

        .location-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
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
          }

          .location-image {
            width: 100%;
            height: 200px;
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