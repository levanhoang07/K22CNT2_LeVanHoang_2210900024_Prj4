import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <>

      <div className="App">
        <header className="App-header">
          <div className="nav-left">
            <h1 className="logo">🎬Doremi Cinema</h1>
          </div>
          <div className="nav-center">
            <ul className="nav-links">
              <li><Link to="/">Trang Chủ</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/locations">Locations</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="nav-right">
            <ul className="nav-links">
              <li><Link to="/giove"><i className="fas fa-ticket-alt"></i> Giỏ Vé</Link></li>
              <li><Link to="/dangnhap"><i className="fas fa-sign-in-alt"></i> Đăng Nhập</Link></li>
              <li><Link to="/dangky"><i className="fas fa-user-plus"></i> Đăng Ký</Link></li>
            </ul>
          </div>
        </header>
      </div>

      <div className="contact-container">
        <h1>Liên Hệ Với Chúng Tôi</h1>
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
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Doremi Cinema</h3>
            <p>Trải nghiệm điện ảnh đỉnh cao với những bộ phim hấp dẫn và dịch vụ tuyệt vời.</p>
          </div>
          <div className="footer-section">
            <h4>Liên kết nhanh</h4>
            <ul>
              <li><Link to="/">Trang Chủ</Link></li>
              <li><Link to="/giove">Giỏ Vé</Link></li>
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
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Doremi Cinema. Nơi dâng trào cảm xúc.</p>
        </div>
      </footer>

      <style>
        {`
          .App-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(to right, #c8e6c9, #a5d6a7);
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .logo {
            font-size: 1.8rem;
            font-weight: bold;
            color: #1b5e20;
          }

          .nav-center, .nav-right {
            display: flex;
          }

          .nav-links {
            display: flex;
            gap: 20px;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .nav-links li a {
            text-decoration: none;
            color: #1b5e20;
            font-size: 1rem;
            transition: color 0.3s;
          }

          .nav-links li a:hover {
            color: #388e3c;
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
          }

          .contact-container {
            width: 100vw;
            max-width: 1200px;
            margin: 40px auto;
            padding: 0 20px;
            background: linear-gradient(to right, #d0f0c0, #e0f7df);
            box-sizing: border-box;
            color: #333;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }

          .contact-container h1 {
            color: rgb(3, 136, 32);
            margin-bottom: 15px;
            font-weight: 700;
          }

          .contact-info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }

          .contact-info-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            background: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.08);
            transition: box-shadow 0.3s;
          }

          .contact-info-item:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }

          .icon {
            font-size: 1.8rem;
            color: #2e7d32;
            margin-top: 4px;
            min-width: 28px;
          }

          .contact-info-item h3 {
            margin: 0 0 6px;
            color: #1b5e20;
          }

          .contact-info-item p {
            margin: 0;
            font-size: 1rem;
          }

          .contact-info-item a {
            color: #1b5e20;
            text-decoration: none;
            font-weight: 600;
          }

          .contact-info-item a:hover {
            color: #388e3c;
            text-decoration: underline;
          }

          .map-container {
            width: 100%;
            height: 350px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }

          .footer {
            background: linear-gradient(to right, #a5d6a7, #c8e6c9);
            color: #1b5e20;
            padding: 40px 20px 20px;
            font-family: 'Roboto', sans-serif;
          }

          .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
          }

          .footer-section h3, .footer-section h4 {
            color: #2e7d32;
          }

          .footer-section ul {
            list-style: none;
            padding: 0;
          }

          .footer-section ul li {
            margin-bottom: 8px;
          }

          .footer-section ul li a {
            color: #1b5e20;
            text-decoration: none;
            font-weight: 500;
          }

          .footer-section ul li a:hover {
            color: #388e3c;
            text-decoration: underline;
          }

          .social-links {
            display: flex;
            gap: 10px;
          }

          .social-icon {
            display: inline-block;
            background-color: #2e7d32;
            color: white;
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            border-radius: 50%;
            font-size: 1.1rem;
            transition: background-color 0.3s;
          }

          .social-icon:hover {
            background-color: #1b5e20;
          }

          .footer-bottom {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9rem;
            color: #145214;
          }

          @media (max-width: 600px) {
            .nav-links {
              flex-direction: column;
              gap: 10px;
            }
            .footer-container {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </>
  );
}
