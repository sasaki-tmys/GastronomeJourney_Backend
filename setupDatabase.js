const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydatabase.db');

db.serialize(() => {
// category テーブルの作成
db.run(`CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL,
    category_img TEXT
)`);

// genre テーブルの作成
db.run(`CREATE TABLE IF NOT EXISTS genre (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
)`);

// stores テーブルの作成
db.run(`CREATE TABLE IF NOT EXISTS store (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category INTEGER,
    genre INTEGER,
    visitDate TEXT,
    nameOfStore TEXT NOT NULL,
    address TEXT,
    totalAmount INTEGER,
    contents TEXT,
    photos TEXT,
    FOREIGN KEY (category) REFERENCES categories(id),
    FOREIGN KEY (genre) REFERENCES genres(id)
)`);
});

db.close();