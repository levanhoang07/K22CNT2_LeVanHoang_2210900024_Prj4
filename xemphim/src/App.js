import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TrangChu from './trang/TrangChu';
import ChiTietPhim from './trang/ChiTietPhim';
import DatVe from './trang/DatVe';
import GioVe from './trang/GioVe';
import DangNhap from './trang/DangNhap';
import DangKy from './trang/DangKy';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Ứng Dụng Xem Phim</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Trang Chủ</Link>
              </li>
              <li>
                <Link to="/chitietphim">Chi Tiết Phim</Link>
              </li>
              <li>
                <Link to="/datve">Đặt Vé</Link>
              </li>
              <li>
                <Link to="/giove">Giỏ Vé</Link>
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
          <Switch>
            <Route path="/" exact component={TrangChu} />
            <Route path="/chitietphim" component={ChiTietPhim} />
            <Route path="/datve" component={DatVe} />
            <Route path="/giove" component={GioVe} />
            <Route path="/dangnhap" component={DangNhap} />
            <Route path="/dangky" component={DangKy} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
