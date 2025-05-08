import React from 'react';
import { useParams, Link } from 'react-router-dom';

const danhSachPhim = [
  { id: 1, ten: 'Mắt Biếc', moTa: 'Phim tình cảm học đường.', anh: 'https://via.placeholder.com/150' },
  { id: 2, ten: 'Hai Phượng', moTa: 'Phim hành động Việt Nam.', anh: 'https://via.placeholder.com/150' },
  { id: 3, ten: 'Em Chưa 18', moTa: 'Phim hài lãng mạn tuổi teen.', anh: 'https://via.placeholder.com/150' },
  { id: 4, ten: 'Bố Già', moTa: 'Phim gia đình cảm động.', anh: 'https://via.placeholder.com/150' },
  { id: 5, ten: 'Tiệc Trăng Máu', moTa: 'Phim tâm lý xã hội.', anh: 'https://via.placeholder.com/150' },
  { id: 6, ten: 'Ròm', moTa: 'Phim về tuổi trẻ và đường phố.', anh: 'https://via.placeholder.com/150' },
  { id: 7, ten: 'Tháng Năm Rực Rỡ', moTa: 'Phim thanh xuân nữ sinh.', anh: 'https://via.placeholder.com/150' },
  { id: 8, ten: 'Lật Mặt: 48h', moTa: 'Phim hành động hồi hộp.', anh: 'https://via.placeholder.com/150' },
  { id: 9, ten: 'Trạng Tí', moTa: 'Phim phiêu lưu hài hước.', anh: 'https://via.placeholder.com/150' },
  { id: 10, ten: 'Song Song', moTa: 'Phim hồi hộp và kỳ ảo.', anh: 'https://via.placeholder.com/150' },
];

export default function ChiTietPhim() {
  const { id } = useParams();
  const phim = danhSachPhim.find(p => p.id === parseInt(id));

  if (!phim) {
    return (
      <div>
        <h1>Không tìm thấy phim</h1>
        <Link to="/">Quay lại Trang chủ</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{phim.ten}</h1>
      <img src={phim.anh} alt={phim.ten} />
      <p>{phim.moTa}</p>
      <Link to={`/datve/${phim.id}`}>Đặt vé</Link>
    </div>
  );
}
