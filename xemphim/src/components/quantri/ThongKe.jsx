import React, { useState } from 'react';

const doanhThuData = [
  { thang: 'Tháng 1', doanhThu: 5000000, luotDatVe: 200 },
  { thang: 'Tháng 2', doanhThu: 7500000, luotDatVe: 300 },
  { thang: 'Tháng 3', doanhThu: 6000000, luotDatVe: 250 },
  { thang: 'Tháng 4', doanhThu: 8000000, luotDatVe: 350 },
  { thang: 'Tháng 5', doanhThu: 9000000, luotDatVe: 400 },
];

export default function ThongKe() {
  const [doanhThu, setDoanhThu] = useState(doanhThuData);

  const tongDoanhThu = doanhThu.reduce((total, item) => total + item.doanhThu, 0);
  const tongLuotDatVe = doanhThu.reduce((total, item) => total + item.luotDatVe, 0);

  return (
    <div>
      <h2>Thống Kê Doanh Thu & Lượt Đặt Vé</h2>
      <div>
        <h4>Tổng Doanh Thu: {tongDoanhThu.toLocaleString()} VND</h4>
        <h4>Tổng Lượt Đặt Vé: {tongLuotDatVe}</h4>
      </div>

      <div>
        <h3>Thống Kê Theo Tháng</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tháng</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Doanh Thu (VND)</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Lượt Đặt Vé</th>
            </tr>
          </thead>
          <tbody>
            {doanhThu.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.thang}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.doanhThu.toLocaleString()}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.luotDatVe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
