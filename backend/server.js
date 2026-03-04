require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');

// Function to send SMS via NanumiNet
async function sendSMS(phone, msgText) {
  try {
    const url = 'http://sms.nanuminet.com/utf8.php';
    const now = new Date();

    // Format: "YYYY-MM-DD HH:mm:ss"
    const pad = n => n.toString().padStart(2, '0');
    const senddate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const params = new URLSearchParams();
    params.append('sms_id', 'leeyw94');
    params.append('sms_pw', 'blueeye0037!');
    params.append('callback', '042-484-1418');
    params.append('senddate', senddate);
    params.append('return_data', '');
    params.append('use_mms', 'N');
    params.append('upFile', '');
    params.append('phone[]', phone);
    params.append('msg[]', msgText);

    const response = await axios.post(url, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log(`[SMS Sent] Phone: ${phone}, Response: ${response.data}`);
  } catch (error) {
    console.error('[SMS Failed] Network/API Error:', error.message);
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Create DB connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test DB Connection
pool.getConnection()
  .then(conn => {
    console.log('Connected to MariaDB successfully.');
    conn.release();
  })
  .catch(err => {
    console.error('Error connecting to MariaDB:', err);
  });

// POST /api/reservations - Create a new reservation
app.post('/api/reservations', async (req, res) => {
  const {
    car_type,
    car_number,
    name,
    phone,
    drop_off_time,
    pick_up_time,
    memo,
    password
  } = req.body;

  if (!car_type || !car_number || !name || !phone || !drop_off_time || !pick_up_time || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Auto-calculate parking days and price
    const dropDate = new Date(drop_off_time);
    const pickDate = new Date(pick_up_time);
    const diffMs = pickDate - dropDate;
    const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const price = days * 5000;

    const query = `
      INSERT INTO reservations (car_type, car_number, name, phone, drop_off_time, pick_up_time, memo, password, source_type, days, price)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'WEB', ?, ?)
    `;
    const values = [car_type, car_number, name, phone, drop_off_time, pick_up_time, memo, hashedPassword, days, price];

    const [result] = await pool.execute(query, values);

    // Return full reservation data to frontend
    res.status(201).json({
      message: 'Reservation created successfully',
      id: result.insertId,
      reservation: { car_type, car_number, name, phone, drop_off_time, pick_up_time, memo, days, price }
    });

    // Format datetime for SMS (2026-03-05T14:00 → 2026-03-05 14:00)
    const fmtDT = (dt) => dt ? dt.replace('T', ' ') : '';

    // Send SMS to customer
    const customerMsg = `[청주공항주차] 예약완료!\n성함: ${name}\n차량: ${car_number}\n입고: ${fmtDT(drop_off_time)}\n출고: ${fmtDT(pick_up_time)}\n${days}일 / ${price.toLocaleString()}원`;
    sendSMS(phone, customerMsg);

    // Send SMS to admin
    const adminMsg = `[청주공항주차] 새 예약!\n성함: ${name}\n연락처: ${phone}\n차량: ${car_number}\n입고: ${fmtDT(drop_off_time)}\n출고: ${fmtDT(pick_up_time)}\n${days}일 / ${price.toLocaleString()}원`;
    sendSMS('010-5178-4756', adminMsg);

  } catch (err) {
    console.error('Error creating reservation:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/reservations/check - Check a reservation
app.post('/api/reservations/check', async (req, res) => {
  const { car_number, password } = req.body;

  if (!car_number || !password) {
    return res.status(400).json({ error: '차량번호와 비밀번호를 입력해주세요.' });
  }

  try {
    const query = 'SELECT * FROM reservations WHERE car_number = ? ORDER BY created_at DESC';
    const [rows] = await pool.execute(query, [car_number]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    // Since a user might have multiple reservations, we check all of them for the provided phone
    // Alternatively, we just check the most recent one. Let's find the first matching password.
    let matchedReservation = null;
    for (const row of rows) {
      const match = await bcrypt.compare(password, row.password);
      if (match) {
        matchedReservation = row;
        break;
      }
    }

    if (!matchedReservation) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Don't send the hashed password back
    delete matchedReservation.password;
    res.status(200).json(matchedReservation);
  } catch (err) {
    console.error('Error checking reservation:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/admin/login - Admin Login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password are required' });
  }

  try {
    const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';
    const [rows] = await pool.execute(query, [username, password]);

    if (rows.length > 0) {
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error logging in admin:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/admin/reservations - Get all reservations
app.get('/api/admin/reservations', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  const token = authHeader.split(' ')[1];
  const [username, password] = token.split(':');

  if (!username || !password) {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  try {
    const adminQuery = 'SELECT * FROM admins WHERE username = ? AND password = ?';
    const [adminRows] = await pool.execute(adminQuery, [username, password]);

    if (adminRows.length === 0) {
      return res.status(401).json({ error: 'Unauthorized credentials' });
    }

    const query = 'SELECT * FROM reservations ORDER BY created_at DESC';
    const [rows] = await pool.execute(query);

    // Remove hashed password from the response data for security
    const safeRows = rows.map(row => {
      const { password, ...safeRow } = row;
      return safeRow;
    });

    res.status(200).json(safeRows);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
