import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrangChu from './components/TrangChu';
import ChiTietPhim from './components/ChiTietPhim';
import DatVe from './components/DatVe';
import GioVe from './components/GioVe';
import DangNhap from './components/DangNhap';
import DangKy from './components/DangKy';
import './App.css';
import QuanTri from './components/quantri/QuanTri';
import QuanLyNguoiDung from './components/quantri/QuanLyNguoiDung';
import QuanLyPhim from './components/quantri/QuanLyPhim';
import QuanLySuatChieu from './components/quantri/QuanLySuatChieu';
import ThongKe from './components/quantri/ThongKe';

function App() {
  return (
    <Router>
      <div className="App">
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
            <Route path="/quantri" element={<QuanTri />} />
              <Route path="/quantri/phim" element={<QuanLyPhim />} />
              <Route path="/quantri/suatchieu" element={<QuanLySuatChieu />} />
              <Route path="/quantri/nguoidung" element={<QuanLyNguoiDung />} />
              <Route path="/quantri/thongke" element={<ThongKe />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
