import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext"; 
import Navigation from "./components/Navigation"; 
import TrangChu from "./components/TrangChu";
import About from "./components/About";
import Contact from "./components/Contact";
import Locations from "./components/Locations";
import ChiTietPhim from "./components/ChiTietPhim";
import DatVe from "./components/DatVe";
import GioVe from "./components/GioVe";
import DangNhap from "./components/DangNhap";
import DangKy from "./components/DangKy";
import QuanTri from "./components/quantri/QuanTri";
import QuanLyNguoiDung from "./components/quantri/QuanLyNguoiDung";
import QuanLyPhim from "./components/quantri/QuanLyPhim";
import QuanLySuatChieu from "./components/quantri/QuanLySuatChieu";
import QuanLyThanhToan from "./components/quantri/QuanLyThanhToan";
import QuanLyPhongChieu from "./components/quantri/QuanLyPhongChieu";
import QuanLyGhe from "./components/quantri/QuanLyGhe";
import QuanLyVeDat from "./components/quantri/QuanLyVeDat";
import InVe from "./components/InVe";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* bocj web trong AuthProvider */}
      <Router>
        <div className="App">
          <Navigation /> {/* Navigation cho component */}
          <main>
            <Routes>
              {/* route phía người dùngdùng */}
              <Route path="/" element={<TrangChu />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/phim/:id" element={<ChiTietPhim />} />
              <Route path="/datve/:id" element={<DatVe />} />
              <Route path="/giove" element={<GioVe />} />
              <Route path="/dangnhap" element={<DangNhap />} />
              <Route path="/dangky" element={<DangKy />} />
              <Route path="/inve/" element={<InVe />} />
          
              {/* route phía quản trị */}
              <Route path="/quantri" element={<QuanTri />}>
                <Route path="phim" element={<QuanLyPhim />} />
                <Route path="suatchieu" element={<QuanLySuatChieu />} />
                <Route path="thanhtoan" element={<QuanLyThanhToan/>} />
                <Route path="phongchieu" element={<QuanLyPhongChieu />} />
                <Route path="ghe" element={<QuanLyGhe />} />
                <Route path="vedat" element={<QuanLyVeDat />} />
                <Route path="nguoidung" element={<QuanLyNguoiDung />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
