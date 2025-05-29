import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Hàm chuyển đổi YouTube URL sang embed
const convertToEmbedUrl = (url) => {
  if (!url) return null;
  const videoId = url.split('v=')[1]?.split('&')[0]; // Lấy phần sau "v="
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
};

export default function ChiTietPhim() {
  const { id } = useParams();
  const [phim, setPhim] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const embedUrl = convertToEmbedUrl(phim.trailer);

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

        {embedUrl && (
          <iframe
            width="320"
            height="180"
            src={embedUrl}
            title="Trailer phim"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ marginTop: '10px', borderRadius: '8px' }}
          ></iframe>
        )}

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
