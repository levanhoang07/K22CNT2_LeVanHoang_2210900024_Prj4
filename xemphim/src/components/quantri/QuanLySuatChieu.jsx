import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://127.0.0.1:3000/api';

const QuanLySuatChieu = () => {
  const [suatList, setSuatList] = useState([]);
  const [phimList, setPhimList] = useState([]);
  const [phongList, setPhongList] = useState([]);
  const [form, setForm] = useState({
    phim_id: '',
    phong_id: '',
    ngay_chieu: '',
    gio_bat_dau: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentSuat, setCurrentSuat] = useState(null);

  useEffect(() => {
    fetchSuatChieu();
    fetchPhim();
    fetchPhong();
  }, []);

  const fetchSuatChieu = () => {
    axios.get(`${API_BASE_URL}/suatchieu`)
      .then(res => setSuatList(res.data))
      .catch(err => {
        console.error('Lỗi khi tải suất chiếu:', err);
        toast.error('Không thể tải danh sách suất chiếu.');
      });
  };

  const fetchPhim = () => {
    axios.get(`${API_BASE_URL}/phim`)
      .then(res => setPhimList(res.data))
      .catch(err => {
        console.error('Lỗi khi tải phim:', err);
        toast.error('Không thể tải danh sách phim.');
      });
  };

  const fetchPhong = () => {
    axios.get(`${API_BASE_URL}/phongchieu`)
      .then(res => setPhongList(res.data))
      .catch(err => {
        console.error('Lỗi khi tải phòng chiếu:', err);
        toast.error('Không thể tải danh sách phòng chiếu.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        phim_id: form.phim_id,
        phong_id: form.phong_id,
        ngay_chieu: form.ngay_chieu,
        gio_bat_dau: form.gio_bat_dau
      };
      if (editing) {
        await axios.put(`${API_BASE_URL}/suatchieu/${currentSuat.suat_chieu_id}`, data);
        toast.success('Cập nhật suất chiếu thành công!');
        setEditing(false);
        setCurrentSuat(null);
      } else {
        await axios.post(`${API_BASE_URL}/suatchieu`, data);
        toast.success('Thêm suất chiếu thành công!');
      }
      setForm({
        phim_id: '',
        phong_id: '',
        ngay_chieu: '',
        gio_bat_dau: ''
      });
      fetchSuatChieu();
    } catch (err) {
      console.error('Lỗi khi thêm hoặc cập nhật suất chiếu:', err);
      toast.error('Không thể thêm hoặc cập nhật suất chiếu.');
    }
  };

  const handleEdit = (suat) => {
    setEditing(true);
    setCurrentSuat(suat);
    setForm({
      phim_id: suat.phim_id,
      phong_id: suat.phong_id,
      ngay_chieu: suat.ngay_chieu,
      gio_bat_dau: suat.gio_bat_dau,
    });
  };

  const handleDelete = async (suat_id) => {
    if (!window.confirm('Bạn có chắc muốn xóa suất chiếu này?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/suatchieu/${suat_id}`);
      toast.success('Xóa suất chiếu thành công!');
      fetchSuatChieu();
    } catch (err) {
      console.error('Lỗi khi xóa suất chiếu:', err);
      toast.error('Không thể xóa suất chiếu.');
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setCurrentSuat(null);
    setForm({
      phim_id: '',
      phong_id: '',
      ngay_chieu: '',
      gio_bat_dau: '',
    });
  };

  return (
    <div className="container">
      <h2>Quản Lý Suất Chiếu</h2>

      <form onSubmit={handleSubmit}>
        <select name="phim_id" value={form.phim_id} onChange={handleChange} required>
          <option value="">-- Chọn phim --</option>
          {phimList.map(phim => (
            <option key={phim.phim_id} value={phim.phim_id}>
              {phim.ten_phim}
            </option>
          ))}
        </select>

        <select name="phong_id" value={form.phong_id} onChange={handleChange} required>
          <option value="">-- Chọn phòng chiếu --</option>
          {phongList.map(phong => (
            <option key={phong.phong_id} value={phong.phong_id}>
              {phong.ten_phong}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="ngay_chieu"
          value={form.ngay_chieu}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="gio_bat_dau"
          value={form.gio_bat_dau}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#27ae60',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            padding: '8px 16px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {editing ? 'Cập nhật suất chiếu' : 'Thêm suất chiếu'}
        </button>
        {editing && (
          <button type="button" className="form-cancel" onClick={handleCancelEdit}>Huỷ chỉnh sửa</button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Phim</th>
            <th>Phòng</th>
            <th>Ngày chiếu</th>
            <th>Giờ bắt đầu</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {suatList.map((suat) => {
            const tenPhim = phimList.find(p => p.phim_id === suat.phim_id)?.ten_phim || 'Không rõ';
            const tenPhong = phongList.find(p => p.phong_id === suat.phong_id)?.ten_phong || 'Không rõ';
            return (
              <tr key={suat.suat_chieu_id}>
                <td>{suat.suat_chieu_id}</td>
                <td>{tenPhim}</td>
                <td>{tenPhong}</td>
                <td>{suat.ngay_chieu}</td>
                <td>{suat.gio_bat_dau ? suat.gio_bat_dau.slice(0,5) : ""}</td>

                <td>
                  <button className="btn-edit" onClick={() => handleEdit(suat)}>Sửa</button>
                  <button className="btn-delete" onClick={() => handleDelete(suat.suat_chieu_id)}>Xóa</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} />

      <style jsx>{`
        .container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h2 {
          color: #333;
          margin-bottom: 20px;
        }
        form {
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
        select:focus, input:focus {
          outline-color: #4CAF50;
        }
        button {
          font-size: 16px;
          cursor: pointer;
        }
        .form-cancel {
          background-color: #95a5a6;
          color: white;
          border: none;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .form-cancel:hover {
          background-color: #7f8c8d;
        }
        .btn-edit {
          background-color: orange;
          color: white;
          border: none;
          padding: 8px 12px;
          margin-right: 5px;
        }
        .btn-edit:hover {
          background-color: darkorange;
        }
        .btn-delete {
          background-color: red;
          color: white;
          border: none;
          padding: 8px 12px;
        }
        .btn-delete:hover {
          background-color: darkred;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ddd;
        }
        th {
          background-color: #f4f4f4;
        }
        tr:nth-child(even) td {
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  );
};

export default QuanLySuatChieu;
