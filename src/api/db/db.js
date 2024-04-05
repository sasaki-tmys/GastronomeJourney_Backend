const sqlite3 = require('sqlite3').verbose();
const dbName = 'mydatabase.db';
const db = new sqlite3.Database(dbName);

module.exports = db;