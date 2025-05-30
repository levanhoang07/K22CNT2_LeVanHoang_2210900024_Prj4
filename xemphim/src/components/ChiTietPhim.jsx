import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const convertToEmbedUrl = (url) => {
  if (!url) return null;
  const videoId = url.split('v=')[1]?.split('&')[0]; 
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
    return <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#555' }}>Đang tải phim ...</div>;
  }

  if (!phim) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
        <h1>Không tìm thấy phim</h1>
        <Link to="/" style={{
          color: '#007BFF',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
          marginTop: '10px',
          display: 'inline-block'
        }}>Quay lại Trang chủ</Link>
      </div>
    );
  }

  const embedUrl = convertToEmbedUrl(phim.trailer);

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '30px',
      padding: '40px 20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      maxWidth: '900px',
      margin: '40px auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
    }}>
      <img
        src={phim.anh}
        alt={phim.ten}
        style={{
          width: '320px',
          height: '480px',
          objectFit: 'cover',
          borderRadius: '15px',
          boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: '280px' }}>
        <h1 style={{ marginBottom: '15px', fontSize: '2.4rem', fontWeight: '700', color: '#222' }}>{phim.ten}</h1>
        <p style={{ marginBottom: '12px', lineHeight: '1.6' }}><strong style={{ color: '#555' }}>Mô tả:</strong> {phim.moTa}</p>
        <p style={{ marginBottom: '8px' }}><strong style={{ color: '#555' }}>Tác giả:</strong> {phim.tacGia}</p>
        <p style={{ marginBottom: '20px' }}><strong style={{ color: '#555' }}>Thời lượng:</strong> {phim.thoiLuong}</p>

        {embedUrl && (
          <iframe
            width="100%"
            height="200"
            src={embedUrl}
            title="Trailer phim"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              marginBottom: '25px',
            }}
          ></iframe>
        )}

        <Link
          to={`/datve/${phim.id}`}
          style={{
            display: 'inline-block',
            padding: '14px 28px',
            backgroundColor: '#007BFF',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 123, 255, 0.4)',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            userSelect: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#0056b3';
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 86, 179, 0.6)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#007BFF';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)';
          }}
        >
          Đặt vé
        </Link>
      </div>
    </div>
  );
}
