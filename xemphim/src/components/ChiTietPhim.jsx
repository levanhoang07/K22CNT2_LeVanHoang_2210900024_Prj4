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
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="ct-loading">
        <div className="ct-spinner"></div>
        <p>Đang tải phim ...</p>
        
      </div>
    );
  }

  if (!phim) {
    return (
      <div className="ct-notfound">
        <h1>Không tìm thấy phim</h1>
        <Link to="/" className="ct-back">Quay lại Trang chủ</Link>
      </div>
    );
  }

  const embedUrl = convertToEmbedUrl(phim.trailer);

  return (
    <div className="ct-main-bg">
      <div className="ct-container">
        <div className="ct-movie-card">
          <div className="ct-movie-image">
            <img src={phim.anh} alt={phim.ten} />
          </div>
          <div className="ct-movie-content">
            <h1 className="ct-title">{phim.ten}</h1>
            <div className="ct-info">
              <p><span className="ct-label">Mô tả:</span> {phim.moTa}</p>
              <p><span className="ct-label">Tác giả:</span> {phim.tacGia}</p>
              <p><span className="ct-label">Thời lượng:</span> {phim.thoiLuong} phút</p>
            </div>
            {embedUrl && (
              <div className="ct-trailer">
                <iframe
                  src={embedUrl}
                  title="Trailer phim"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div className="ct-btn-group">
              <Link to="/" className="ct-btn ct-btn-home">
                Quay lại Trang chủ
              </Link>
              <Link to={`/datve/${phim.id}`} className="ct-btn ct-btn-datve">
                Đặt vé ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`
      .ct-loading {
            text-align: center;
            padding: 60px 0;
            color: #e53935;
            font-size: 1.2rem;
          }
          .ct-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(229,57,53, 0.2);
            border-top: 3px solid #e53935;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
      .ct-notfound {
            text-align: center;
            padding: 60px 0;
            color: #e53935;
          }
          .ct-back {
            color: #fff;
            background: #e53935;
            padding: 10px 22px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 18px;
            display: inline-block;
            transition: background 0.2s;
          }
          .ct-back:hover {
            background: #b71c1c;
          }
        .ct-main-bg {
          background: rgb(40,38,38);
          min-height: 100vh;
          padding: 0;
          
        }
        .ct-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 16px 60px 16px;
        }
        .ct-movie-card {
          display: flex;
          flex-direction: row;
          gap: 40px;
          background: rgba(28,28,32,0.98);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(40,40,60,0.14), 0 1.5px 0 #e53935 inset;
          overflow: hidden;
          align-items: flex-start;
        }
        .ct-movie-image {
          flex-shrink: 0;
          width: 340px;
          min-width: 240px;
          max-width: 340px;
          height: 510px;
          background: #232733;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 24px 0 0 24px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(40,40,60,0.10);
        }
        .ct-movie-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px 0 0 24px;
        }
        .ct-movie-content {
          flex: 1;
          padding: 38px 18px 38px 0;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .ct-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #e53935;
          margin-bottom: 18px;
          font-family: 'Playfair Display', serif;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 16px #e53935, 0 1px 0 #fff;
        }
        .ct-info {
          font-size: 1.13rem;
          color: #e0e0e0;
          margin-bottom: 22px;
          line-height: 1.7;
        }
        .ct-label {
          color: #ffb199;
          font-weight: 600;
          margin-right: 6px;
        }
        .ct-trailer {
          margin-bottom: 28px;
        }
        .ct-trailer iframe {
          width: 100%;
          min-height: 220px;
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(229,57,53,0.10);
          background: #181c24;
        }
        .ct-btn-group {
          display: flex;
          gap: 14px;
          margin-top: 10px;
        }
        .ct-btn {
          display: inline-block;
          padding: 10px 22px;
          background: linear-gradient(90deg, #e53935 60%, #ffb199 100%);
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(229,57,53,0.13);
          letter-spacing: 0.5px;
          transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
        }
        .ct-btn-home {
          background: linear-gradient(90deg, #232733 60%, #555 100%);
          color: #fff;
          border: 1.5px solid #e53935;
        }
        .ct-btn-home:hover {
          background: #181c24;
          color: #e53935;
        }
        .ct-btn-datve {
          background: linear-gradient(90deg, #e53935 60%, #ffb199 100%);
        }
        .ct-btn-datve:hover {
          background: linear-gradient(90deg, #b71c1c 60%, #e57373 100%);
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 24px rgba(229,57,53,0.18);
        }
        @media (max-width: 900px) {
          .ct-movie-card {
            flex-direction: column;
            gap: 0;
            border-radius: 18px;
          }
          .ct-movie-image {
            width: 100%;
            max-width: 100vw;
            height: 320px;
            border-radius: 18px 18px 0 0;
          }
          .ct-movie-image img {
            border-radius: 18px 18px 0 0;
          }
          .ct-movie-content {
            padding: 24px 12px 24px 12px;
          }
          .ct-btn-group {
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}