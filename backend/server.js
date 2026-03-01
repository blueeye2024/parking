require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');

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

    const query = `
      INSERT INTO reservations (car_type, car_number, name, phone, drop_off_time, pick_up_time, memo, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [car_type, car_number, name, phone, drop_off_time, pick_up_time, memo, hashedPassword];

    const [result] = await pool.execute(query, values);
    res.status(201).json({ message: 'Reservation created successfully', id: result.insertId });
  } catch (err) {
    console.error('Error creating reservation:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/reservations/check - Check a reservation
app.post('/api/reservations/check', async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ error: 'Phone and password are required' });
  }

  try {
    const query = 'SELECT * FROM reservations WHERE phone = ? ORDER BY created_at DESC';
    const [rows] = await pool.execute(query, [phone]);

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
