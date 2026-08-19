const Database = require('better-sqlite3');
const express = require('express');

const app = express()

// Open database, it will create a file is it does not exist
const db = new Database('trackerlog.db');

// Enable Write-Ahead Logging for better concurrent read performance
// This is recommended for most applications
db.pragma('journal_mode = WAL');

// Enable foreign key constraints (disabled by default in SQLite)
db.pragma('foreign_keys = ON');

console.log('Database connected successfully');

// Creating a table
// adding check to difficulty doesn't allow user to write something other then what the options are given
db.exec(`
    CREATE TABLE IF NOT EXISTS problems(
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       difficulty TEXT CHECK(difficulty IN ('Easy', 'Medium', 'Hard')),
       notes TEXT
    )
`);

// Middleware that allows express to understand JSON req bodies, and serve html/css/js
app.use(express.json());
app.use(express.static('public'));

// Route: create a new problem entry
app.post('/api/problems', (req, res) => {
    const { name, difficulty, notes } = req.body;   

    const stmt = db.prepare('INSERT INTO problems (name, difficulty, notes) VALUES (?, ?, ?)');
    const info = stmt.run(name, difficulty, notes);
 
    res.status(201).json({ id: info.lastInsertRowid, name, difficulty, notes });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});