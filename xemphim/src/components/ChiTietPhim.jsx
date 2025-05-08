import React from 'react';
import { useParams, Link } from 'react-router-dom';

const danhSachPhim = [
  {
    id: 1,
    ten: 'Mắt Biếc',
    moTa: 'Một câu chuyện tình yêu đầy tiếc nuối giữa Ngạn và Hà Lan, gợi lại tuổi học trò đầy mộng mơ và day dứt.',
    tacGia: 'Victor Vũ',
    thoiLuong: '117 phút',
    anh: 'https://th.bing.com/th/id/R.ced5017cb4ee94fe71611036f6a89a36?rik=XGQVDZCpFRmYsw&pid=ImgRaw&r=0'
  },
  {
    id: 2,
    ten: 'Hai Phượng',
    moTa: 'Một bà mẹ đơn thân dấn thân vào thế giới ngầm để giải cứu con gái mình bị bắt cóc, đầy hành động và cảm xúc.',
    tacGia: 'Lê Văn Kiệt',
    thoiLuong: '98 phút',
    anh: 'https://th.bing.com/th/id/R.52a8160aa3cf0afa720d31755c9c0b04?rik=BmNRA1LTlnolsw&pid=ImgRaw&r=0'
  },
  {
    id: 3,
    ten: 'Em Chưa 18',
    moTa: 'Một bộ phim hài – tình cảm học đường, kể về mối quan hệ “trớ trêu” giữa một học sinh cấp 3 và một tay chơi sát gái.',
    tacGia: 'Lê Thanh Sơn',
    thoiLuong: '108 phút',
    anh: 'https://static.tuoitre.vn/tto/i/s626/2017/04/06/1-1491445646.jpg'
  },
  {
    id: 4,
    ten: 'Bố Già',
    moTa: 'Câu chuyện gia đình cảm động về tình cha con, những xung đột thế hệ, và tình yêu thương không điều kiện.',
    tacGia: 'Trấn Thành',
    thoiLuong: '120 phút',
    anh: 'https://th.bing.com/th/id/OIP.o9DHR35-qyyhNEhhiI8nlQHaK-?rs=1&pid=ImgDetMain'
  },
  {
    id: 5,
    ten: 'Tiệc Trăng Máu',
    moTa: 'Một bữa tiệc biến thành thảm họa khi bí mật của từng người lần lượt được tiết lộ qua chiếc điện thoại.',
    tacGia: 'Nguyễn Quang Dũng',
    thoiLuong: '115 phút',
    anh: 'https://th.bing.com/th/id/OIP.wBnourAYqCKkpYk0tqm_NwAAAA?rs=1&pid=ImgDetMain'
  },
  {
    id: 6,
    ten: 'Ròm',
    moTa: 'Bộ phim chân thực về cuộc sống khó khăn nơi đô thị, theo chân cậu bé sống bằng nghề “dẫn số đề”.',
    tacGia: 'Trần Thanh Huy',
    thoiLuong: '93 phút',
    anh: 'https://th.bing.com/th/id/OIP.vLOAqQuI9p8eghlQsvzXAgHaK-?rs=1&pid=ImgDetMain'
  },
  {
    id: 7,
    ten: 'Tháng Năm Rực Rỡ',
    moTa: 'Những ký ức thanh xuân của nhóm bạn nữ sinh được tái hiện, vừa hài hước vừa xúc động.',
    tacGia: 'Nguyễn Quang Dũng',
    thoiLuong: '118 phút',
    anh: 'https://th.bing.com/th/id/OIP.SaMkkU3u5qmFGVagrNMeJgHaK-?rs=1&pid=ImgDetMain'
  },
  {
    id: 8,
    ten: 'Lật Mặt 7',
    moTa: 'Bộ phim kết hợp giữa hành động và gia đình, mang đến nhiều tình huống bất ngờ và cảm động.',
    tacGia: 'Lý Hải',
    thoiLuong: '104 phút',
    anh: 'https://th.bing.com/th/id/OIP.zvN3Ljo5Cz94IMPkEVP31AHaLH?rs=1&pid=ImgDetMain'
  },
  {
    id: 9,
    ten: 'Trạng Tí',
    moTa: 'Chuyến phiêu lưu kỳ thú của cậu bé thông minh Trạng Tí và những người bạn để khám phá thân thế của mình.',
    tacGia: 'Phan Gia Nhật Linh',
    thoiLuong: '100 phút',
    anh: 'https://touchcinema.com/uploads/phim-2021/61b4633451b0a2eefba1-poster.jpg'
  },
  {
    id: 10,
    ten: 'Avatar 2',
    moTa: 'Tiếp nối câu chuyện ở Pandora với hình ảnh mãn nhãn, khám phá những vùng đất mới dưới đại dương.',
    tacGia: 'James Cameron',
    thoiLuong: '192 phút',
    anh: 'https://th.bing.com/th/id/R.88386fe549d83e6ae16b49f8543e4baa?rik=lEi3KbbTR1V1hw&pid=ImgRaw&r=0'
  },
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
    <div style={{ display: 'flex', alignItems: 'flex-flex', gap: '20px', padding: '20px' }}>
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
