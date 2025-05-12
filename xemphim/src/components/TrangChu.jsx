import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TrangChu() {
  const [searchTerm, setSearchTerm] = useState('');
  const [phimList, setPhimList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/phim')
      .then((response) => response.json())
      .then((data) => {
        setPhimList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu phim: ", error);
        setLoading(false);
      });
  }, []);

  const filteredPhim = phimList.filter(phim =>
    phim.ten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1 className="logo">Doremi Cinema</h1>
          <nav className="nav-menu">
            <ul>
              <li>
                <Link to="/" className="nav-link">
                  <i className="fas fa-home"></i> Trang Chủ
                </Link>
              </li>
              <li>
                <Link to="/giove" className="nav-link">
                  <i className="fas fa-ticket-alt"></i> Giỏ Vé
                </Link>
              </li>
              <li>
                <Link to="/dangnhap" className="nav-link">
                  <i className="fas fa-sign-in-alt"></i> Đăng Nhập
                </Link>
              </li>
              <li>
                <Link to="/dangky" className="nav-link">
                  <i className="fas fa-user-plus"></i> Đăng Ký
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>

      <div className="trangchu-container">
        <h1>Phim Đang Chiếu</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="phim-grid">
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : filteredPhim.length > 0 ? (
            filteredPhim.map(phim => (
              <div key={phim.id} className="phim-card">
                <img src={phim.anh} alt={phim.ten} />
                <h2>{phim.ten}</h2>
                <p>{phim.moTa}</p>
                <Link to={`/phim/${phim.id}`}>Xem chi tiết</Link>
              </div>
            ))
          ) : (
            <p>Không tìm thấy phim nào.</p>
          )}
        </div>
      </div>

      {/* Footer */}
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
          <p>© 2025 Doremi Cinema. All Rights Reserved.</p>
        </div>
      </footer>
      
      <style>
        {`
          .trangchu-container {
            padding: 40px;
            background: linear-gradient(to right, #d0f0c0, #e0f7df);
            color: #2e7d32;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
          }

          .trangchu-container h1 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 20px;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
          }

          .search-bar {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
          }

          .search-bar input {
            width: 100%;
            max-width: 400px;
            padding: 12px 16px;
            font-size: 1rem;
            border: 2px solid #2e7d32;
            border-radius: 8px;
            outline: none;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }

          .search-bar input:focus {
            border-color: #1b5e20;
            box-shadow: 0 0 8px rgba(46, 125, 50, 0.3);
          }

          .search-bar input::placeholder {
            color: #81c784;
          }

          .phim-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 24px;
          }

          .phim-card {
            background-color: #ffffffcc;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeInUp 0.8s ease forwards;
            opacity: 0;
          }

          .phim-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 20px rgba(0,0,0,0.25);
          }

          .phim-card img {
            width: 100%;
            border-radius: 8px;
            margin-bottom: 12px;
          }

          .phim-card h2 {
            font-size: 1.2rem;
            margin-bottom: 8px;
            color: #388e3c;
          }

          .phim-card p {
            font-size: 0.9rem;
            margin-bottom: 10px;
          }

          .phim-card a {
            text-decoration: none;
            color: #2e7d32;
            font-weight: bold;
            transition: color 0.2s;
          }

          .phim-card a:hover {
            color: #1b5e20;
            text-shadow: 0 0 6px #a5d6a7;
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

          .footer-section h3 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: #2e7d32;
          }

          .footer-section h4 {
            font-size: 1.2rem;
            margin-bottom: 15px;
            color: #2e7d32;
          }

          .footer-section p {
            font-size: 0.9rem;
            line-height: 1.6;
            margin-bottom: 10px;
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

          @keyframes fadeInUp {
            from {
              transform: translateY(40px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
    
  );
}
