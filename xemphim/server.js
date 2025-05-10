const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());

const config = {
  user: 'lvh2210900024',
  password: 'hoang123',
  server: 'localhost',
  database: 'VeXemPhim1',
  connectionTimeout: 30000,
  requestTimeout: 30000,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

app.get('/api/phim', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM phim');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi lấy dữ liệu.');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
