const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            submitted_at TEXT,
            responses_json TEXT
        )
    `, (err) => {
        if (err) console.error('❌ Ошибка:', err.message);
        else console.log('✅ Таблица responses создана');
    });
});

db.close();