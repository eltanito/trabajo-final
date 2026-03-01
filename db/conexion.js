const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error SQLite:', err.message);
    } else {
        console.log('✅ SQLite conectado');
    }
});

module.exports = db;