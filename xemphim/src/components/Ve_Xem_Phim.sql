-- Tạo cơ sở dữ liệu
CREATE DATABASE Ve_Xem_Phim;
GO

-- Thay đổi collation của cơ sở dữ liệu sau khi tạo
ALTER DATABASE Ve_Xem_Phim
COLLATE Vietnamese_CI_AI;
GO

-- Sử dụng cơ sở dữ liệu vừa tạo
USE Ve_Xem_Phim;
GO

-- Tạo bảng người dùng để lưu thông tin tài khoản
CREATE TABLE nguoi_dung (
    nguoidung_id INT PRIMARY KEY IDENTITY(1,1),
    ten_dang_nhap NVARCHAR(100) COLLATE Vietnamese_CI_AI NOT NULL,
    mat_khau NVARCHAR(255) COLLATE Vietnamese_CI_AI NOT NULL,
    ho_ten NVARCHAR(100) COLLATE Vietnamese_CI_AI,
    email NVARCHAR(100) COLLATE Vietnamese_CI_AI,
    so_dien_thoai NVARCHAR(20) COLLATE Vietnamese_CI_AI,
    la_quan_tri BIT
);

-- Tạo bảng phim để lưu thông tin các bộ phim
CREATE TABLE phim (
    phim_id INT IDENTITY(1,1) PRIMARY KEY,
    ten_phim NVARCHAR(255) COLLATE Vietnamese_CI_AI NOT NULL,
    mo_ta NVARCHAR(MAX) COLLATE Vietnamese_CI_AI,
    thoi_luong INT, -- Lưu số phút
    anh NVARCHAR(255) COLLATE Vietnamese_CI_AI,
    trailer NVARCHAR(255) COLLATE Vietnamese_CI_AI,
    tac_gia NVARCHAR(100) COLLATE Vietnamese_CI_AI
);

-- Tạo bảng phòng chiếu để lưu thông tin các phòng
CREATE TABLE phong_chieu (
    phong_id INT PRIMARY KEY,
    ten_phong NVARCHAR(100) COLLATE Vietnamese_CI_AI NOT NULL,
    so_ghe INT NOT NULL,
    phim_id INT NULL,
    CONSTRAINT fk_phong_phim FOREIGN KEY (phim_id) REFERENCES phim(phim_id) ON DELETE SET NULL
);

-- Tạo bảng ghế để lưu thông tin ghế trong phòng chiếu
CREATE TABLE ghe (
    ghe_id INT PRIMARY KEY IDENTITY(1,1),
    phong_id INT NOT NULL,
    so_ghe NVARCHAR(10) COLLATE Vietnamese_CI_AI NOT NULL,
    loai_ghe NVARCHAR(10) COLLATE Vietnamese_CI_AI NOT NULL,
    gia_ve DECIMAL(10, 2) NOT NULL DEFAULT 0,
    CONSTRAINT fk_ghe_phong FOREIGN KEY (phong_id) REFERENCES phong_chieu(phong_id) ON DELETE CASCADE,
    CONSTRAINT chk_loai_ghe CHECK (loai_ghe IN (N'Thường', N'VIP')),
    CONSTRAINT chk_gia_ve CHECK (gia_ve >= 0)
);

-- Tạo bảng suất chiếu để lưu thông tin lịch chiếu
CREATE TABLE suat_chieu (
    suat_chieu_id INT PRIMARY KEY IDENTITY(1,1),
    phim_id INT NOT NULL,
    phong_id INT NOT NULL,
    ngay_chieu DATE NOT NULL,
    gio_bat_dau TIME NOT NULL,
    CONSTRAINT fk_suatchieu_phim FOREIGN KEY (phim_id) REFERENCES phim(phim_id) ON DELETE CASCADE,
    CONSTRAINT fk_suatchieu_phong FOREIGN KEY (phong_id) REFERENCES phong_chieu(phong_id) ON DELETE CASCADE
);

-- Tạo bảng vé đặt để lưu thông tin vé đã đặt
CREATE TABLE ve_dat (
    ve_id INT PRIMARY KEY IDENTITY(1,1),
    so_luong INT NOT NULL DEFAULT 1,
    nguoi_dung_id INT NOT NULL,
    suat_chieu_id INT NOT NULL,
    thoi_gian_dat DATETIME NOT NULL,
    trang_thai NVARCHAR(20) COLLATE Vietnamese_CI_AI NOT NULL,
    CONSTRAINT fk_vedat_nguoidung FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoidung_id) ON DELETE CASCADE,
    CONSTRAINT fk_vedat_suat_chieu FOREIGN KEY (suat_chieu_id) REFERENCES suat_chieu(suat_chieu_id) ON DELETE CASCADE,
    CONSTRAINT chk_trang_thai CHECK (trang_thai IN (N'Đã đặt', N'Đã hủy')),
    CONSTRAINT chk_so_luong CHECK (so_luong > 0)
);

-- Tạo bảng chi tiết vé đặt
CREATE TABLE chi_tiet_ve_dat (
    chi_tiet_id INT PRIMARY KEY IDENTITY(1,1),
    ve_dat_id INT NOT NULL,
    ghe_id INT NOT NULL,
    gia_ve DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_chitiet_vedat_vedat FOREIGN KEY (ve_dat_id) REFERENCES ve_dat(ve_id) ON DELETE CASCADE,
    CONSTRAINT fk_chitiet_vedat_ghe FOREIGN KEY (ghe_id) REFERENCES ghe(ghe_id) ON DELETE NO ACTION
);

-- Chèn dữ liệu mẫu vào bảng người dùng
INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, ho_ten, email, so_dien_thoai, la_quan_tri) VALUES
(N'admin', N'123456', N'Quản Trị Viên', N'admin@example.com', N'0909999999', 1),
(N'hoang', N'123456', N'Lê Văn Hoàng', N'hoang@gmail.com', N'0911111', 0),
(N'user2', N'userpass', N'Trần Thị B', N'b@example.com', N'0922222222', 0);

INSERT INTO phim (ten_phim, mo_ta, thoi_luong, anh, trailer, tac_gia) VALUES
(N'Mắt Biếc', N'Một câu chuyện tình yêu đầy tiếc nuối giữa Ngạn và Hà Lan, gợi lại tuổi học trò đầy mộng mơ và day dứt.', 117, 
 N'https://th.bing.com/th/id/R.ced5017cb4ee94fe71611036f6a89a36?rik=XGQVDZCpFRmYsw&pid=ImgRaw&r=0', 
 N'https://www.youtube.com/watch?v=ITlQ0oU7tDA&t=17s', 
 N'Victor Vũ'),

(N'Hai Phượng', N'Một bà mẹ đơn thân dấn thân vào thế giới ngầm để giải cứu con gái mình bị bắt cóc, đầy hành động và cảm xúc.', 98, 
 N'https://th.bing.com/th/id/R.52a8160aa3cf0afa720d31755c9c0b04?rik=BmNRA1LTlnolsw&riu=http%3a%2f%2fwww.impawards.com%2fintl%2fvietnam%2f2019%2fposters%2fhai_phuong_ver2.jpg&ehk=yP51yBZZ8o4wHgUpd4C%2bPRgoMYPhVI8KWhYIZcvjAD0%3d&risl=&pid=ImgRaw&r=0', 
 N'https://www.youtube.com/watch?v=THXPCF6UHh8', 
 N'Lê Văn Kiệt'),

(N'Em Chưa 18', N'Một bộ phim hài – tình cảm học đường, kể về mối quan hệ “trớ trêu” giữa một học sinh cấp 3 và một tay chơi sát gái.', 108, 
 N'https://static.tuoitre.vn/tto/i/s626/2017/04/06/1-1491445646.jpg', 
 N'https://www.youtube.com/watch?v=_affkHceSj4', 
 N'Lê Thanh Sơn'),

(N'Bố Già', N'Câu chuyện gia đình cảm động về tình cha con, những xung đột thế hệ, và tình yêu thương không điều kiện.', 120, 
 N'https://th.bing.com/th/id/OIP.o9DHR35-qyyhNEhhiI8nlQHaK-?rs=1&pid=ImgDetMain', 
 N'https://www.youtube.com/watch?v=jluSu8Rw6YE', 
 N'Trấn Thành'),

(N'Tiệc Trăng Máu', N'Một bữa tiệc biến thành thảm họa khi bí mật của từng người lần lượt được tiết lộ qua chiếc điện thoại.', 115, 
 N'https://th.bing.com/th/id/OIP.wBnourAYqCKkpYk0tqm_NwAAAA?rs=1&pid=ImgDetMain', 
 N'https://www.youtube.com/watch?v=nh0BklwPN9Q', 
 N'Nguyễn Quang Dũng'),

(N'Ròm', N'Bộ phim chân thực về cuộc sống khó khăn nơi đô thị, theo chân cậu bé sống bằng nghề “dẫn số đề”.', 93, 
 N'https://th.bing.com/th/id/OIP.vLOAqQuI9p8eghlQsvzXAgHaK-?rs=1&pid=ImgDetMain', 
 N'https://www.youtube.com/watch?v=XRm1P7oGpMQ', 
 N'Trần Thanh Huy'),

(N'Tháng Năm Rực Rỡ', N'Những ký ức thanh xuân của nhóm bạn nữ sinh được tái hiện, vừa hài hước vừa xúc động.', 118, 
 N'https://th.bing.com/th/id/OIP.SaMkkU3u5qmFGVagrNMeJgHaK-?rs=1&pid=ImgDetMain', 
 N'https://www.youtube.com/watch?v=qjWoaNWZ2Xo', 
 N'Nguyễn Quang Dũng'),

(N'Lật Mặt 7', N'Bộ phim kết hợp giữa hành động và gia đình, mang đến nhiều tình huống bất ngờ và cảm động.', 104, 
 N'https://th.bing.com/th/id/OIP.zvN3Ljo5Cz94IMPkEVP31AHaLH?rs=1&pid=ImgDetMain', 
 N'https://www.youtube.com/watch?v=d1ZHdosjNX8', 
 N'Lý Hải'),

(N'Trạng Tí', N'Chuyến phiêu lưu kỳ thú của cậu bé thông minh Trạng Tí và những người bạn để khám phá thân thế của mình.', 100, 
 N'https://touchcinema.com/uploads/phim-2021/61b4633451b0a2eefba1-poster.jpg', 
 N'https://www.youtube.com/watch?v=r-SR6-b4OQo', 
 N'Phan Gia Nhật Linh'),

(N'Avatar 2', N'Tiếp nối câu chuyện ở Pandora với hình ảnh mãn nhãn, khám phá những vùng đất mới dưới đại dương.', 192, 
 N'https://th.bing.com/th/id/R.88386fe549d83e6ae16b49f8543e4baa?rik=lEi3KbbTR1V1hw&pid=ImgRaw&r=0', 
 N'https://www.youtube.com/watch?v=d9MyW72ELq0', 
 N'James Cameron');

-- Chèn dữ liệu mẫu vào bảng phòng chiếu
INSERT INTO phong_chieu (phong_id, ten_phong, phim_id, so_ghe) VALUES
(1, N'Phòng 1', 1, 34),
(2, N'Phòng 2', 2, 34),
(3, N'Phòng 3', 3, 34),
(4, N'Phòng 4', 4, 34),
(5, N'Phòng 5', 5, 34),
(6, N'Phòng 6', 6, 34),
(7, N'Phòng 7', 7, 34),
(8, N'Phòng 8', 8, 34),
(9, N'Phòng 9', 9, 34),
(10, N'Phòng 10', 10, 34);


-- Chèn dữ liệu mẫu vào bảng ghế với giá vé
-- Hàng A
INSERT INTO ghe (phong_id, so_ghe, loai_ghe, gia_ve) VALUES
(1, 'A1', N'Thường', 79000),
(1, 'A2', N'Thường', 79000),
(1, 'A3', N'Thường', 79000),
(1, 'A4', N'Thường', 79000);

-- Hàng B
INSERT INTO ghe (phong_id, so_ghe, loai_ghe, gia_ve) VALUES
(1, 'B1', N'Thường', 79000),
(1, 'B2', N'Thường', 79000),
(1, 'B3', N'Thường', 79000),
(1, 'B4', N'Thường', 79000),
(1, 'B5', N'Thường', 79000);

-- Hàng C
INSERT INTO ghe (phong_id, so_ghe, loai_ghe, gia_ve) VALUES
(1, 'C1', N'Thường', 79000),
(1, 'C2', N'Thường', 79000),
(1, 'C3', N'Thường', 79000),
(1, 'C4', N'Thường', 79000),
(1, 'C5', N'Thường', 79000),
(1, 'C6', N'Thường', 79000);

-- Hàng D
INSERT INTO ghe (phong_id, so_ghe, loai_ghe, gia_ve) VALUES
(1, 'D1', N'Thường', 79000),
(1, 'D2', N'Thường', 79000),
(1, 'D3', N'Thường', 79000),
(1, 'D4', N'Thường', 79000),
(1, 'D5', N'Thường', 79000),
(1, 'D6', N'Thường', 79000),
(1, 'D7', N'Thường', 79000);

-- Hàng E
INSERT INTO ghe (phong_id, so_ghe, loai_ghe, gia_ve) VALUES
(1, 'E1', N'Thường', 79000),
(1, 'E2', N'Thường', 79000),
(1, 'E3', N'Thường', 79000),
(1, 'E4', N'Thường', 79000),
(1, 'E5', N'Thường', 79000),
(1, 'E6', N'Thường', 79000),
(1, 'E7', N'Thường', 79000),
(1, 'E8', N'Thường', 79000);

-- Hàng F (VIP)
INSERT INTO ghe (phong_id, so_ghe, loai_ghe, gia_ve) VALUES
(1, 'F1', N'VIP', 99000),
(1, 'F2', N'VIP', 99000),
(1, 'F3', N'VIP', 99000),
(1, 'F4', N'VIP', 99000);


-- Chèn dữ liệu mẫu vào bảng suất chiếu
INSERT INTO suat_chieu (phim_id, phong_id, ngay_chieu, gio_bat_dau) VALUES
(1, 1, '2025-06-03', '18:00'),
(2, 2, '2025-06-03', '20:00'),
(3, 3, '2025-06-03', '19:00'),
(4, 4, '2025-06-03', '17:00'),
(5, 5, '2025-06-03', '21:00'),
(6, 6, '2025-06-03', '18:30'),
(7, 7, '2025-06-03', '19:30'),
(8, 8, '2025-06-03', '20:30'),
(9, 9, '2025-06-03', '17:30'),
(10, 10, '2025-06-03', '16:00');

-- Chèn dữ liệu mẫu vào bảng vé đặt với số lượng
INSERT INTO ve_dat (nguoi_dung_id, suat_chieu_id, thoi_gian_dat, trang_thai, so_luong) VALUES
(2, 1, '2025-06-02 10:00:00', N'Đã đặt', 2),  
(3, 2, '2025-06-02 11:00:00', N'Đã đặt', 1),  
(2, 3, '2025-06-02 12:00:00', N'Đã đặt', 1);  

-- Chèn dữ liệu mẫu vào bảng chi tiết vé đặt
-- Ví dụ vé đặt 1 chọn ghế A1 (Thường), A2 (Thường), F1 (VIP)
INSERT INTO chi_tiet_ve_dat (ve_dat_id, ghe_id, gia_ve) VALUES
(1, 1, 79000),  -- A1, Thường
(1, 2, 79000),  -- A2, Thường
(1, 30, 99000); -- F1, VIP


  

-- Tạo chỉ mục để tối ưu truy vấn
CREATE INDEX idx_ten_dang_nhap ON nguoi_dung(ten_dang_nhap);
CREATE INDEX idx_phim_id ON suat_chieu(phim_id);

-- Xem dữ liệu để kiểm tra
SELECT * FROM nguoi_dung;
SELECT * FROM phim;
SELECT * FROM phong_chieu;
SELECT * FROM ghe;
SELECT * FROM suat_chieu;
SELECT * FROM ve_dat;
SELECT * FROM chi_tiet_ve_dat;


DROP TABLE chi_tiet_ve_dat;
DROP TABLE ve_dat;
DROP TABLE suat_chieu;
DROP TABLE ghe;  
DROP TABLE phong_chieu;
DROP TABLE phim;
DROP TABLE nguoi_dung;