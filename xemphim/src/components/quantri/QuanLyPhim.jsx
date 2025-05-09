import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Dữ liệu mẫu phim (có thể thay thế bằng API thực tế)
const danhSachPhim = [
  {
    id: 1,
    ten: 'Mắt Biếc',
    moTa: 'Một câu chuyện tình yêu đầy tiếc nuối giữa Ngạn và Hà Lan.',
    tacGia: 'Victor Vũ',
    thoiLuong: '117 phút',
    giaTien: '150,000 VND',
    anh: 'https://th.bing.com/th/id/R.ced5017cb4ee94fe71611036f6a89a36?rik=XGQVDZCpFRmYsw&pid=ImgRaw&r=0'
  },
  {
    id: 2,
    ten: 'Hai Phượng',
    moTa: 'Một bà mẹ đơn thân dấn thân vào thế giới ngầm để giải cứu con gái.',
    tacGia: 'Lê Văn Kiệt',
    thoiLuong: '98 phút',
    giaTien: '120,000 VND',
    anh: 'https://th.bing.com/th/id/R.52a8160aa3cf0afa720d31755c9c0b04?rik=BmNRA1LTlnolsw&riu=http%3a%2f%2fwww.impawards.com%2fintl%2fvietnam%2f2019%2fposters%2fhai_phuong_ver2.jpg&ehk=yP51yBZZ8o4wHgUpd4C%2bPRgoMYPhVI8KWhYIZcvjAD0%3d&risl=&pid=ImgRaw&r=0'
  },
];

export default function QuanLyPhim() {
  const [phimList, setPhimList] = useState(danhSachPhim);
  
  // Các state cho form thêm phim
  const [ten, setTen] = useState('');
  const [tacGia, setTacGia] = useState('');
  const [thoiLuong, setThoiLuong] = useState('');
  const [giaTien, setGiaTien] = useState('');
  const [anh, setAnh] = useState('');

  const handleXoaPhim = (id) => {
    const updatedList = phimList.filter(phim => phim.id !== id);
    setPhimList(updatedList);
  };

  const handleThemPhim = (e) => {
    e.preventDefault();
    // Tạo một id mới cho phim
    const newId = phimList.length ? phimList[phimList.length - 1].id + 1 : 1;
    // Thêm phim mới vào danh sách
    const newPhim = {
      id: newId,
      ten,
      tacGia,
      thoiLuong,
      giaTien,
      anh,
    };
    setPhimList([...phimList, newPhim]);
    // Reset form sau khi thêm phim
    setTen('');
    setTacGia('');
    setThoiLuong('');
    setGiaTien('');
    setAnh('');
  };

  return (
    <div>
      <h3>Quản lý Phim</h3>
      <p>Thông tin về quản lý phim sẽ được hiển thị ở đây.</p>
      
      {/* Form thêm phim trực tiếp */}
      <div>
        <h4>Thêm Phim Mới</h4>
        <form onSubmit={handleThemPhim}>
          <div>
            <label>Tên Phim:</label>
            <input
              type="text"
              value={ten}
              onChange={(e) => setTen(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Tác Giả:</label>
            <input
              type="text"
              value={tacGia}
              onChange={(e) => setTacGia(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Thời Lượng:</label>
            <input
              type="text"
              value={thoiLuong}
              onChange={(e) => setThoiLuong(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Giá Vé:</label>
            <input
              type="text"
              value={giaTien}
              onChange={(e) => setGiaTien(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Ảnh:</label>
            <input
              type="text"
              value={anh}
              onChange={(e) => setAnh(e.target.value)}
              required
            />
          </div>
          <button type="submit">Lưu Phim</button>
        </form>
      </div>

      {/* Danh sách phim */}
      <div>
        <h4>Danh sách phim</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tên Phim</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tác Giả</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Thời Lượng</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Giá Vé</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {phimList.map((phim) => (
              <tr key={phim.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{phim.ten}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{phim.tacGia}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{phim.thoiLuong}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{phim.giaTien}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button onClick={() => handleXoaPhim(phim.id)} style={{ color: 'red' }}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
