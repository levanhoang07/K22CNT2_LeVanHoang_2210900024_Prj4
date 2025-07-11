import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuanLyVeDat = () => {
  const [veList, setVeList] = useState([]);
  const [nguoiDungList, setNguoiDungList] = useState([]);
  const [suatChieuList, setSuatChieuList] = useState([]);
  const [gheList, setGheList] = useState([]);
  const [phimList, setPhimList] = useState([]);
  const [form, setForm] = useState({
    nguoi_dung_id: '',
    phim_id: '',
    suat_chieu_id: '',
    ghe_id: '',
    thoi_gian_dat: '',
    trang_thai: 'Đã đặt',
  });
  const [editing, setEditing] = useState(false);
  const [currentVe, setCurrentVe] = useState(null);

  // Lấy dữ liệu
  const fetchAll = () => {
    axios.get('http://127.0.0.1:3000/api/vedat').then(res => setVeList(res.data)).catch(console.error);
    axios.get('http://127.0.0.1:3000/api/nguoidung').then(res => setNguoiDungList(res.data)).catch(console.error);
    axios.get('http://127.0.0.1:3000/api/suatchieu').then(res => setSuatChieuList(res.data)).catch(console.error);
    axios.get('http://127.0.0.1:3000/api/ghe').then(res => setGheList(res.data)).catch(console.error);
    axios.get('http://127.0.0.1:3000/api/phim').then(res => setPhimList(res.data)).catch(console.error);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Xử lý thay đổi form
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newForm = { ...form, [name]: value };
    if (name === 'suat_chieu_id') {
      const suat = suatChieuList.find(s => s.suat_chieu_id === Number(value));
      if (suat) newForm.phim_id = suat.phim_id;
    }
    if (name === 'phim_id') {
      // Khi chọn phim, reset suất chiếu nếu không thuộc phim đó
      if (form.suat_chieu_id) {
        const suat = suatChieuList.find(s => s.suat_chieu_id === Number(form.suat_chieu_id));
        if (!suat || String(suat.phim_id) !== String(value)) {
          newForm.suat_chieu_id = '';
        }
      }
    }
    setForm(newForm);
  };

  // Thêm hoặc cập nhật vé
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chuyển đổi định dạng ngày giờ
      let thoi_gian_dat = form.thoi_gian_dat;
      if (thoi_gian_dat && thoi_gian_dat.includes('T')) {
        thoi_gian_dat = thoi_gian_dat.replace('T', ' ') + ':00';
      }

      let data = {
        nguoi_dung_id: Number(form.nguoi_dung_id),
        suat_chieu_id: Number(form.suat_chieu_id),
        ghe_ids: [Number(form.ghe_id)],
        thoi_gian_dat: thoi_gian_dat,
        trang_thai: form.trang_thai,
        so_luong: 1,
      };
      if (!editing) {
        await axios.post('http://127.0.0.1:3000/api/vedat', data);
      } else {
        await axios.put(`http://127.0.0.1:3000/api/vedat/${currentVe.ve_id}`, data);
        setEditing(false);
        setCurrentVe(null);
      }
      setForm({ nguoi_dung_id: '', phim_id: '', suat_chieu_id: '', ghe_id: '', thoi_gian_dat: '', trang_thai: 'Đã đặt' });
      fetchAll();
    } catch (err) {
      console.error('Lỗi khi thêm hoặc cập nhật vé:', err.response ? err.response.data : err);
      alert('Không thể thêm hoặc cập nhật vé.');
    }
  };

  // Sửa vé
  const handleEdit = (ve) => {
    setEditing(true);
    setCurrentVe(ve);
    let ghe_id = '';
    if (Array.isArray(ve.chi_tiet) && ve.chi_tiet.length > 0) {
      ghe_id = ve.chi_tiet[0].ghe_id;
    } else if (ve.ghe_id) {
      ghe_id = ve.ghe_id;
    }

    let thoi_gian_dat = '';
    if (ve.thoi_gian_dat) {
      if (ve.thoi_gian_dat.includes('T')) {
        thoi_gian_dat = ve.thoi_gian_dat.slice(0, 16);
      } else {
        const d = new Date(ve.thoi_gian_dat);
        if (!isNaN(d.getTime())) {
          thoi_gian_dat = d.toISOString().slice(0, 16);
        }
      }
    }

    // Lấy phim_id từ suất chiếu
    const suat = suatChieuList.find(s => s.suat_chieu_id === ve.suat_chieu_id);
    setForm({
      nguoi_dung_id: ve.nguoi_dung_id,
      phim_id: suat ? suat.phim_id : '',
      suat_chieu_id: ve.suat_chieu_id,
      ghe_id: ghe_id,
      thoi_gian_dat: thoi_gian_dat,
      trang_thai: ve.trang_thai,
    });
  };

  // Hủy sửa
  const handleCancelEdit = () => {
    setEditing(false);
    setCurrentVe(null);
    setForm({ nguoi_dung_id: '', phim_id: '', suat_chieu_id: '', ghe_id: '', thoi_gian_dat: '', trang_thai: 'Đã đặt' });
  };

  // Xóa vé
  const handleDelete = async (ve_id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vé này không?')) {
      try {
        await axios.delete(`http://127.0.0.1:3000/api/vedat/${ve_id}`);
        fetchAll();
      } catch (err) {
        console.error('Lỗi khi xóa vé:', err);
        alert('Không thể xóa vé.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Quản Lý Vé Đặt</h2>

      {editing && currentVe && (
        <div style={{ marginBottom: '10px', padding: '10px', border: '1px solid #f39c12', backgroundColor: '#fff3e0' }}>
          <strong>Đang chỉnh sửa vé ID: {currentVe.ve_id}</strong>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        <select name="nguoi_dung_id" value={form.nguoi_dung_id} onChange={handleChange} required>
          <option value="">-- Chọn người dùng --</option>
          {nguoiDungList.map(user => (
            <option key={user.nguoidung_id} value={user.nguoidung_id}>
              {user.ho_ten || user.ten_dang_nhap}
            </option>
          ))}
        </select>

        {/* Thêm trường chọn phim */}
        <select name="phim_id" value={form.phim_id} onChange={handleChange} required>
          <option value="">-- Chọn phim --</option>
          {phimList.map(phim => (
            <option key={phim.phim_id || phim.id} value={phim.phim_id || phim.id}>
              {phim.ten || phim.ten_phim}
            </option>
          ))}
        </select>

        {/* Chỉ hiển thị suất chiếu thuộc phim đã chọn */}
        <select name="suat_chieu_id" value={form.suat_chieu_id} onChange={handleChange} required>
          <option value="">-- Chọn suất chiếu --</option>
          {suatChieuList
            .filter(s => !form.phim_id || String(s.phim_id) === String(form.phim_id))
            .map(suat => (
              <option key={suat.suat_chieu_id} value={suat.suat_chieu_id}>
                {suat.ngay_chieu} {suat.gio_bat_dau}
              </option>
            ))}
        </select>

        <select name="ghe_id" value={form.ghe_id} onChange={handleChange} required>
          <option value="">-- Chọn ghế --</option>
          {gheList.map(ghe => (
            <option key={ghe.ghe_id} value={ghe.ghe_id}>
              {ghe.so_ghe} ({ghe.loai_ghe})
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="thoi_gian_dat"
          value={form.thoi_gian_dat}
          onChange={handleChange}
          required
          disabled={!editing}
        />

        <select name="trang_thai" value={form.trang_thai} onChange={handleChange} required>
          <option value="Đã đặt">Đã đặt</option>
          <option value="Hủy">Hủy</option>
        </select>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit">{editing ? 'Cập nhật vé' : 'Đặt vé'}</button>
          {editing && <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: '#ccc', color: '#000' }}>Hủy</button>}
        </div>
      </form>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Người dùng</th>
            <th>Tên phim</th>
            <th>Suất chiếu</th>
            <th>Ghế</th>
            <th>Thời gian đặt</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {veList.map(ve => {
            const user = nguoiDungList.find(u => u.nguoidung_id === ve.nguoi_dung_id);
            const suat = suatChieuList.find(s => s.suat_chieu_id === ve.suat_chieu_id);
            const phim = suat ? phimList.find(p => p.phim_id === suat.phim_id || p.id === suat.phim_id) : null;

            // Xử lý tên ghế: ưu tiên chi_tiet, fallback sang ghe_id
            let gheStr = 'Không rõ';
            if (Array.isArray(ve.chi_tiet) && ve.chi_tiet.length > 0) {
              gheStr = ve.chi_tiet
                .map(g => {
                  if (g.so_ghe) return g.so_ghe;
                  const gheObj = gheList.find(ghe => ghe.ghe_id === g.ghe_id);
                  return gheObj ? gheObj.so_ghe : '';
                })
                .filter(Boolean)
                .join(', ');
            } else if (ve.ghe_id) {
              const gheObj = gheList.find(g => g.ghe_id === ve.ghe_id);
              gheStr = gheObj ? gheObj.so_ghe : 'Không rõ';
            }

            return (
              <tr key={ve.ve_id}>
                <td>{ve.ve_id}</td>
                <td>{user?.ho_ten || user?.ten_dang_nhap}</td>
                <td>{phim ? (phim.ten || phim.ten_phim) : 'Không rõ'}</td>
                <td>
                  {suat
                    ? `${suat.ngay_chieu} ${suat.gio_bat_dau ? suat.gio_bat_dau.slice(0,5) : ''}`
                    : 'Không rõ'}
                </td>
                <td>{gheStr}</td>
                <td>{ve.thoi_gian_dat ? ve.thoi_gian_dat.replace('T', ' ').slice(0, 16) : ''}</td>
                <td>{ve.trang_thai}</td>
                <td>
                  <button onClick={() => handleEdit(ve)} className="edit-button">Sửa</button>
                  <button onClick={() => handleDelete(ve.ve_id)} className="delete-button">Xóa</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <style jsx>{`
        .container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h2 {
          color: #333;
          margin-bottom: 20px;
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }
        select, input, button {
          padding: 8px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ddd;
        }
        button {
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #45a049;
        }
        .styled-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ddd;
        }
        th {
          background-color: #f4f4f4;
          font-weight: bold;
        }
        td {
          background-color: #fff;
        }
        td:nth-child(odd) {
          background-color: #f9f9f9;
        }
        .edit-button {
          background-color: #f39c12;
          color: white;
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          margin-right: 5px;
          cursor: pointer;
        }
        .edit-button:hover {
          background-color: #e67e22;
        }
        .delete-button {
          background-color: #e74c3c;
          color: white;
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .delete-button:hover {
          background-color: #c0392b;
        }
      `}</style>
    </div>
  );
};

export default QuanLyVeDat;