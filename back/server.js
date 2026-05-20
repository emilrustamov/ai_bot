const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, '..', 'database.db');
const db = new sqlite3.Database(dbPath);

// Маршрут для сохранения анкеты
app.post('/api/submit', (req, res) => {
    const data = req.body;
    const session_id = data.session_id || Date.now().toString();
    const submitted_at = new Date().toISOString();
    const responses_json = JSON.stringify(data);
    
    const query = `
        INSERT INTO responses (session_id, submitted_at, responses_json)
        VALUES (?, ?, ?)
    `;
    
    db.run(query, [session_id, submitted_at, responses_json], function(err) {
        if (err) {
            console.error('❌ Ошибка сохранения:', err.message);
            res.status(500).json({ error: err.message });
        } else {
            console.log('✅ Сохранено, id:', this.lastID);
            res.json({ success: true, id: this.lastID });
        }
    });
});

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});