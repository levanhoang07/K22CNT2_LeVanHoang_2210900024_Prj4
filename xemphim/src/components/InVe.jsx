import React from 'react';

const InVe = React.forwardRef(({ ve, phim, suat, gheArr, tongTien, user }, ref) => {
  return (
    <div
      ref={ref}
      className="inve-container"
      style={{
        maxWidth: 420,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px #eee',
        padding: 24,
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h2 style={{ color: '#b71c1c', textAlign: 'center', marginBottom: 18 }}>VÉ XEM PHIM</h2>
      <div style={{ marginBottom: 12, textAlign: 'center' }}>
        <img
          src={phim?.anh || 'https://via.placeholder.com/80x110?text=No+Image'}
          alt={phim?.ten || phim?.ten_phim || 'Phim'}
          style={{
            width: 80,
            height: 110,
            objectFit: 'cover',
            borderRadius: 8,
            marginBottom: 8
          }}
        />
      </div>
      <div style={{ fontSize: 17, marginBottom: 8 }}>
        <b>Phim:</b> {phim ? (phim.ten || phim.ten_phim) : ve.phim_id}
      </div>
      <div style={{ marginBottom: 6 }}>
        <b>Suất chiếu:</b>{' '}
        {suat
          ? `${suat.ngay_chieu} ${suat.gio_bat_dau ? suat.gio_bat_dau.slice(0, 5) : ''}`
          : ve.suat_chieu_id}
      </div>
      <div style={{ marginBottom: 6 }}>
        <b>Ghế:</b> {gheArr && gheArr.length > 0 ? gheArr.join(', ') : 'Chưa có'}
      </div>
      <div style={{ marginBottom: 6 }}>
        <b>Phòng:</b> {suat?.phong_id || 'Không rõ'}
      </div>
      <div style={{ marginBottom: 6 }}>
        <b>Khách hàng:</b> {user?.ho_ten || user?.ten_dang_nhap || user?.email || 'Ẩn danh'}
      </div>
      <div style={{ marginBottom: 6 }}>
        <b>Mã vé:</b> #{ve.ve_id}
      </div>
      <div style={{ marginBottom: 10, color: '#388e3c', fontWeight: 600 }}>
        <b>Tổng tiền:</b> {Number(tongTien).toLocaleString()} đ
      </div>
      <div
        style={{
          fontSize: 13,
          color: '#888',
          margin: '18px 0 8px 0',
          textAlign: 'center'
        }}
      >
        Vui lòng xuất trình vé này tại quầy để được hỗ trợ.<br />
        Chúc bạn xem phim vui vẻ!
      </div>
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <span style={{ fontSize: 12, color: '#aaa' }}>
          Ngày in: {new Date().toLocaleString('vi-VN')}
        </span>
      </div>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .inve-container, .inve-container * { visibility: visible !important; }
          .inve-container { position: absolute; left: 0; top: 0; width: 100vw; background: #fff; box-shadow: none; }
        }
      `}</style>
    </div>
  );
});

export default InVe;