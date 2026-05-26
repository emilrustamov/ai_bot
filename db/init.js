const { run } = require('./connection');
const { sqlTypeFor } = require('./columns');
const { getAllQuestionKeys, surveyData } = require('../config/schema');

async function initDb() {
    const questionCols = getAllQuestionKeys()
        .filter((k) => /^[a-z0-9_]+$/.test(k))
        .map((key) => `${key} ${sqlTypeFor(surveyData[key].type)}`)
        .join(',\n    ');

    await run(`
        CREATE TABLE IF NOT EXISTS responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT UNIQUE NOT NULL,
            submitted_at TEXT,
            part1_at TEXT NOT NULL,
            part2_at TEXT,
            lang TEXT,
            is_complete INTEGER DEFAULT 0,
            user_agent TEXT,
            ip_hash TEXT,
            duration_seconds INTEGER,
            ${questionCols}
        )
    `);

    await run(`
        CREATE TABLE IF NOT EXISTS admin_logins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            logged_at TEXT NOT NULL,
            ip_hash TEXT,
            username TEXT NOT NULL
        )
    `);

    await run('CREATE INDEX IF NOT EXISTS idx_responses_submitted_at ON responses(submitted_at)');
    await run('CREATE INDEX IF NOT EXISTS idx_responses_part1_at ON responses(part1_at)');
    await run('CREATE INDEX IF NOT EXISTS idx_responses_is_complete ON responses(is_complete)');
    await run('CREATE INDEX IF NOT EXISTS idx_admin_logins_logged_at ON admin_logins(logged_at)');
}

module.exports = { initDb };
