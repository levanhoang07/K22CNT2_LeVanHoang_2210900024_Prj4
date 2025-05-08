import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TrangChu from './components/TrangChu';
import ChiTietPhim from './components/ChiTietPhim';
import DatVe from './components/DatVe';
import GioVe from './components/GioVe';
import DangNhap from './components/DangNhap';
import DangKy from './components/DangKy';
import './App.css';
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Doremi Cinema</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Trang Chủ</Link>
              </li>
              <li>
                <Link to="/giove">🛒Giỏ Vé</Link>
              </li>
              <li>
                <Link to="/dangnhap">Đăng Nhập</Link>
              </li>
              <li>
                <Link to="/dangky">Đăng Ký</Link>
              </li>
            </ul>
          </nav>
        </header>
       
        <main>
          <Routes>
            <Route path="/" element={<TrangChu />} />
            <Route path="/chitietphim" element={<ChiTietPhim />} />
            <Route path="/phim/:id" element={<ChiTietPhim />} />
            <Route path="/datve" element={<DatVe />} />
            <Route path="/datve/:id" element={<DatVe />} />
            <Route path="/giove" element={<GioVe />} />
            <Route path="/dangnhap" element={<DangNhap />} />
            <Route path="/dangky" element={<DangKy />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
