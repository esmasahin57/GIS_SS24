const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
var cors = require('cors');


const app = express();
const port = 5000;
const hostname = 'localhost';
app.use(cors());

// Middleware
app.use(bodyParser.json());

// SQLite3 Database
const dbPath = path.resolve(__dirname, 'DrinkDiary.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to database');
    // Create table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        dailyGoal REAL,
        consumed REAL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table', err);
      } else {
        console.log('Table created or already exists');
      }
    });
  }
});

// API Endpoints

// GET /entries
app.get('/entries', (req, res) => {
  db.all('SELECT * FROM entries', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});




// POST /entries
app.post('/entries', (req, res) => {
  const { date, dailyGoal, consumed } = req.body;
  db.run('INSERT INTO entries (date, dailyGoal, consumed) VALUES (?, ?, ?)', [date, dailyGoal, consumed], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// PUT /entries/:id
app.put('/entries/:id', (req, res) => {
  const { id } = req.params;
  const { date, dailyGoal, consumed } = req.body;
  db.run('UPDATE entries SET date = ?, dailyGoal = ?, consumed = ? WHERE id = ?', [date, dailyGoal, consumed, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

// DELETE /entries/:id
app.delete('/entries/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM entries WHERE id = ?', id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

// Start server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
