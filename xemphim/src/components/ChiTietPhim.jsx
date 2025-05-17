import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ChiTietPhim() {
  const { id } = useParams();
  const [phim, setPhim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function fetchPhim() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://127.0.0.1:3000/api/phim/${id}`);
        if (!response.ok) throw new Error('Không tìm thấy phim');
        const data = await response.json();
        setPhim(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPhim();
  }, [id]);

  function themVaoGio(phim) {
    setAdding(true);
    const gioVe = JSON.parse(localStorage.getItem('gioVe')) || [];
    if (!gioVe.find(item => item.phim_id === phim.phim_id)) {
      gioVe.push(phim);
      localStorage.setItem('gioVe', JSON.stringify(gioVe));
      alert('Đã thêm vé vào giỏ vé!');
    } else {
      alert('Phim đã có trong giỏ vé!');
    }
    setAdding(false);
  }

  if (loading) return <div>Đang tải phim...</div>;
  if (error) return (
    <div>
      <h1>{error}</h1>
      <Link to="/">Quay lại Trang chủ</Link>
    </div>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '20px' }}>
      <img
        src={phim.anh}
        alt={phim.ten_phim}
        style={{ width: '300px', height: '450px', objectFit: 'cover', borderRadius: '10px' }}
      />
      <div>
        <h1>{phim.ten_phim}</h1>
        <p><strong>Mô tả:</strong> {phim.mo_ta}</p>
        <p><strong>Tác giả:</strong> {phim.tac_gia}</p>
        <p><strong>Thời lượng:</strong> {phim.thoi_luong}</p>

        <button
          onClick={() => themVaoGio(phim)}
          disabled={adding}
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {adding ? 'Đang thêm...' : 'Đặt vé'}
        </button>

        <div style={{ marginTop: '10px' }}>
          <Link to="/">Quay lại Trang chủ</Link> | <Link to="/gio-ve">Xem giỏ vé</Link>
        </div>
      </div>
    </div>
  );
}
