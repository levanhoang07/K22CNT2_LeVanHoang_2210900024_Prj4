import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import QuanLyPhim from './QuanLyPhim';
import QuanLySuatChieu from './QuanLySuatChieu';
import QuanLyNguoiDung from './QuanLyNguoiDung';
import ThongKe from './ThongKe';

export default function QuanTri() {
  return (
    <div>
      <h1>Trang Quản Trị</h1>
      <nav>
        <Link to="phim">Quản lý phim</Link> | 
        <Link to="suatchieu">Quản lý suất chiếu</Link> | 
        <Link to="nguoidung">Quản lý người dùng</Link> | 
        <Link to="thongke">Thống kê</Link>
      </nav>
      <Routes>
        <Route path="phim" element={<QuanLyPhim />} />
        <Route path="suatchieu" element={<QuanLySuatChieu />} />
        <Route path="nguoidung" element={<QuanLyNguoiDung />} />
        <Route path="thongke" element={<ThongKe />} />
      </Routes>
    </div>
  );
}
