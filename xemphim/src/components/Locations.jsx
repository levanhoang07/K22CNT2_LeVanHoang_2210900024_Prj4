import React from 'react';
import { Link } from 'react-router-dom';

export default function Locations() {
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

      <div className="locations-container">
        <h1>Hệ Thống Rạp</h1>
        <p className="locations-intro">
          Chúng tôi tự hào có các rạp chiếu hiện đại, tiện nghi và không gian thoải mái tại nhiều thành phố lớn.
          Hãy chọn rạp gần bạn nhất để trải nghiệm điện ảnh đỉnh cao cùng Doremi Cinema!
        </p>
        <ul className="locations-list">
          <li className="location-item">
            <div className="location-info">
              <h2>Hà Nội <i className="fas fa-map-marker-alt"></i></h2>
              <p><strong>Địa chỉ:</strong> Số 25 Vũ Ngọc Phan, Láng Hạ, Đống Đa, Hà Nội</p>
              <p>Rạp chiếu được trang bị công nghệ màn hình lớn, âm thanh sống động, phục vụ đa dạng thể loại phim mới nhất.</p>
            </div>
            <div className="location-image">
              <img src="https://th.bing.com/th/id/OIP.d-rWdo6XTgcHkrqvvwZ_3gHaDt?rs=1&pid=ImgDetMain" alt="Rạp Hà Nội" />
            </div>
          </li>

          <li className="location-item">
            <div className="location-info">
              <h2>Vĩnh Phúc <i className="fas fa-map-marker-alt"></i></h2>
              <p><strong>Địa chỉ:</strong> Số 88 Hoàng Hoa Thám, Ngọc Thanh, Phúc Yên, Vĩnh Phúc</p>
              <p>Không gian thân thiện, dịch vụ chuyên nghiệp, thuận tiện cho gia đình và nhóm bạn.</p>
            </div>
            <div className="location-image">
              <img src="https://thumbs.dreamstime.com/b/3d-cinema-15318377.jpg" alt="Rạp Vĩnh Phúc" />
            </div>
          </li>

          <li className="location-item">
            <div className="location-info">
              <h2>Đà Nẵng <i className="fas fa-map-marker-alt"></i></h2>
              <p><strong>Địa chỉ:</strong> Tầng 4, TTTM Vincom Đà Nẵng, Ngô Quyền, P. An Hải Bắc, Q. Sơn Trà, Tp. Đà Nẵng</p>
              <p>Địa điểm lý tưởng cho các tín đồ điện ảnh, gần trung tâm thành phố, dễ dàng di chuyển.</p>
            </div>
            <div className="location-image">
              <img src="https://smartschoolsolutions.in/wp-content/uploads/2022/08/pim-pr-img27.webp" alt="Rạp Đà Nẵng" />
            </div>
          </li>
        </ul>
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

          .locations-container {
            max-width: 900px;
            margin: 50px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
          }

          .locations-container h1 {
            color: rgb(3, 136, 32);
            margin-bottom: 10px;
            text-align: center;
          }

          .locations-intro {
            text-align: center;
            margin-bottom: 30px;
            font-size: 1.1rem;
            color: #555;
          }

          .locations-list {
            list-style: none;
            padding-left: 0;
          }

          .location-item {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            transition: box-shadow 0.3s ease;
            background: #f9f9f9;
          }

          .location-item:hover {
            box-shadow: 0 0 15px rgba(3, 136, 32, 0.4);
            background: #e8f5e9;
          }

          .location-info {
            flex: 1;
          }

          .location-info h2 {
            color: #2e7d32;
            margin-bottom: 8px;
            font-size: 1.5rem;
          }

          .location-info h2 i {
            color: #388e3c;
            margin-left: 8px;
          }

          .location-info p {
            margin: 5px 0;
            font-size: 1.1rem;
          }

          .location-image {
            flex-shrink: 0;
            width: 160px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 8px rgba(0,0,0,0.15);
          }

          .location-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
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
            transition: background-color 0.3s ease;
          }

          .social-icon:hover {
            background-color: #1b5e20;
          }

          .footer-bottom {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9rem;
            font-weight: 500;
            color: #2e7d32;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .App-header {
              flex-direction: column;
              align-items: flex-start;
            }
            .nav-center, .nav-right {
              margin-top: 10px;
              flex-wrap: wrap;
              gap: 10px;
            }
            .footer-container {
              grid-template-columns: 1fr;
            }
            .location-item {
              flex-direction: column;
              align-items: center;
            }
            .location-image {
              width: 100%;
              max-width: 400px;
              margin-top: 15px;
            }
            .location-info h2 {
              text-align: center;
            }
            .locations-intro {
              padding: 0 10px;
            }
          }
        `}
      </style>
    </>
  );
}
