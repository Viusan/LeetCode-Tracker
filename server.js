const Database = require('better-sqlite3');

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