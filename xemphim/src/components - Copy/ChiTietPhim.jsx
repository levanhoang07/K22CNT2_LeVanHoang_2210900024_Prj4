import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Thành phần hiển thị chi tiết phim
export default function ChiTietPhim() {
  const { id } = useParams();
  const [phim, setPhim] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy thông tin phim từ API
  useEffect(() => {
    fetch(`http://localhost:3000/api/phim`)
      .then((response) => response.json())
      .then((data) => {
        const foundPhim = data.find(p => p.id === parseInt(id));
        setPhim(foundPhim);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu phim: ", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!phim) {
    return (
      <div>
        <h1>Không tìm thấy phim</h1>
        <Link to="/">Quay lại Trang chủ</Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '20px' }}>
      <img
        src={phim.anh}
        alt={phim.ten}
        style={{ width: '300px', height: '450px', objectFit: 'cover', borderRadius: '10px' }}
      />
      <div>
        <h1>{phim.ten}</h1>
        <p><strong>Mô tả:</strong> {phim.moTa}</p>
        <p><strong>Tác giả:</strong> {phim.tacGia}</p>
        <p><strong>Thời lượng:</strong> {phim.thoiLuong}</p>
        <Link to={`/datve/${phim.id}`} style={{
          display: 'inline-block',
          marginTop: '15px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Đặt vé
        </Link>
      </div>
    </div>
  );
}