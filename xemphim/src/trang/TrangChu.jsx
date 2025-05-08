import React from 'react';
import { Link } from 'react-router-dom';

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

export default function TrangChu() {
  return (
    <div>
      <h1>Phim Đang Chiếu</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {danhSachPhim.map(phim => (
          <div key={phim.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <img src={phim.anh} alt={phim.ten} style={{ width: '100%' }} />
            <h2 style={{ fontSize: '18px' }}>{phim.ten}</h2>
            <p>{phim.moTa}</p>
            <Link to={`/phim/${phim.id}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
