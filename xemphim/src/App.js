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
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
