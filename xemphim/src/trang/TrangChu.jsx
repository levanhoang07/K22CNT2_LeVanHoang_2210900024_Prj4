import React from 'react';
import { Link } from 'react-router-dom';

const danhSachPhim = [
  { id: 1, ten: 'Mắt Biếc', moTa: 'Phim tình cảm học đường.', anh: 'https://th.bing.com/th/id/R.ced5017cb4ee94fe71611036f6a89a36?rik=XGQVDZCpFRmYsw&pid=ImgRaw&r=0' },
  { id: 2, ten: 'Hai Phượng', moTa: 'Phim hành động Việt Nam.', anh: 'https://th.bing.com/th/id/R.52a8160aa3cf0afa720d31755c9c0b04?rik=BmNRA1LTlnolsw&riu=http%3a%2f%2fwww.impawards.com%2fintl%2fvietnam%2f2019%2fposters%2fhai_phuong_ver2.jpg&ehk=yP51yBZZ8o4wHgUpd4C%2bPRgoMYPhVI8KWhYIZcvjAD0%3d&risl=&pid=ImgRaw&r=0' },
  { id: 3, ten: 'Em Chưa 18', moTa: 'Phim hài lãng mạn tuổi teen.', anh: 'https://static.tuoitre.vn/tto/i/s626/2017/04/06/1-1491445646.jpg' },
  { id: 4, ten: 'Bố Già', moTa: 'Phim gia đình cảm động.', anh: 'https://th.bing.com/th/id/OIP.o9DHR35-qyyhNEhhiI8nlQHaK-?rs=1&pid=ImgDetMain' },
  { id: 5, ten: 'Tiệc Trăng Máu', moTa: 'Phim tâm lý xã hội.', anh: 'https://th.bing.com/th/id/OIP.wBnourAYqCKkpYk0tqm_NwAAAA?rs=1&pid=ImgDetMain' },
  { id: 6, ten: 'Ròm', moTa: 'Phim về tuổi trẻ và đường phố.', anh: 'https://th.bing.com/th/id/OIP.vLOAqQuI9p8eghlQsvzXAgHaK-?rs=1&pid=ImgDetMain' },
  { id: 7, ten: 'Tháng Năm Rực Rỡ', moTa: 'Phim thanh xuân nữ sinh.', anh: 'https://th.bing.com/th/id/OIP.SaMkkU3u5qmFGVagrNMeJgHaK-?rs=1&pid=ImgDetMain' },
  { id: 8, ten: 'Lật Mặt 7', moTa: 'Phim tình cảm gia đinhgđinhg.', anh: 'https://th.bing.com/th/id/OIP.zvN3Ljo5Cz94IMPkEVP31AHaLH?rs=1&pid=ImgDetMain' },
  { id: 9, ten: 'Trạng Tí', moTa: 'Phim phiêu lưu hài hước.', anh: 'https://touchcinema.com/uploads/phim-2021/61b4633451b0a2eefba1-poster.jpg' },
  { id: 10, ten: 'Avatar 22', moTa: 'Phim khoa học viễn tưởng.', anh: 'https://th.bing.com/th/id/R.88386fe549d83e6ae16b49f8543e4baa?rik=lEi3KbbTR1V1hw&pid=ImgRaw&r=0' },
];

export default function TrangChu() {
  return (
    <>
      <div className="trangchu-container">
        <h1>Phim Đang Chiếu</h1>
        <div className="phim-grid">
          {danhSachPhim.map(phim => (
            <div key={phim.id} className="phim-card">
              <img src={phim.anh} alt={phim.ten} />
              <h2>{phim.ten}</h2>
              <p>{phim.moTa}</p>
              <Link to={`/phim/${phim.id}`}>Xem chi tiết</Link>
            </div>
          ))}
        </div>
      </div>

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
            margin-bottom: 30px;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
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
