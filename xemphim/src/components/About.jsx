import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      {/* Header giống trang chủ */}
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

      {/* Nội dung About */}
      <div className="about-container">
        <h1>Giới Thiệu Về Doremi Cinema</h1>
        <p><strong>Doremi Cinema</strong> tự hào là hệ thống rạp chiếu phim hiện đại hàng đầu, nơi mang đến trải nghiệm giải trí đỉnh cao với hình ảnh sắc nét và âm thanh sống động, giúp bạn đắm chìm vào từng khung cảnh của bộ phim yêu thích.</p>

        <p>Chúng tôi không chỉ cập nhật liên tục những bộ phim bom tấn mới nhất, mà còn cung cấp dịch vụ đặt vé nhanh chóng, tiện lợi giúp tiết kiệm thời gian, đồng thời tạo ra không gian thoải mái, sang trọng để bạn và gia đình có thể tận hưởng trọn vẹn những phút giây giải trí.</p>

        <p>Bên cạnh đó, Doremi Cinema còn thường xuyên tổ chức các chương trình ưu đãi hấp dẫn dành riêng cho khách hàng thân thiết, mong muốn mang đến nhiều hơn những giá trị tuyệt vời cho cộng đồng yêu điện ảnh.</p>

        <p>Với niềm tin rằng điện ảnh là cầu nối gắn kết mọi người, chúng tôi luôn không ngừng nỗ lực để tạo nên những khoảnh khắc đáng nhớ, là nơi bạn và những người thân yêu có thể sẻ chia cảm xúc và kỷ niệm.</p>

        <p><em>Cảm ơn bạn đã lựa chọn Doremi Cinema – Nơi cảm xúc thăng hoa và từng khoảnh khắc trở nên ý nghĩa!</em></p>
      </div>

      {/* Footer giống trang chủ */}
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

      {/* Style CSS từ trang chủ + style riêng cho About */}
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

          .about-container {
            max-width: 800px; /* hoặc 700px, tuỳ bạn */
            margin: 0 auto;
            padding: 40px 20px;
            /* giữ nguyên các style còn lại */
          }

          .about-container h1 {
            color: rgb(3, 136, 32);
            margin-bottom: 20px;
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
            margin-bottom: 10px;
          }

          .footer-section ul li a {
            text-decoration: none;
            color: #1b5e20;
            font-size: 0.9rem;
            transition: color 0.3s ease;
          }

          .footer-section ul li a:hover {
            color: #388e3c;
            text-decoration: underline;
          }

          .social-links {
            display: flex;
            gap: 15px;
          }

          .social-icon {
            color: #1b5e20;
            font-size: 1.5rem;
            transition: transform 0.3s ease, color 0.3s ease;
          }

          .social-icon:hover {
            color: #388e3c;
            transform: scale(1.2);
          }

          .footer-bottom {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #81c784;
          }

          .footer-bottom p {
            font-size: 0.85rem;
            color: #1b5e20;
          }
        `}
      </style>
    </>
  );
}
