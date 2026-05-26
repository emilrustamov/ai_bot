const express = require('express');
const { run, get, all } = require('../db/connection');
const { hashIp } = require('../utils/ipHash');
const requireAdmin = require('../middleware/requireAdmin');
const {
    surveyData,
    blocksConfig,
    getAllQuestionKeys
} = require('../config/schema');

const router = express.Router();

function formatValue(key, raw) {
    if (raw === null || raw === undefined || raw === '') return '—';
    const q = surveyData[key];
    if (!q) return String(raw);
    if (q.type === 'checkbox') {
        try {
            const arr = JSON.parse(raw);
            return arr.map((v) => {
                const opt = q.options?.find((o) => o.value === v);
                return opt ? opt.label.ru : v;
            }).join(', ');
        } catch {
            return String(raw);
        }
    }
    if (q.options) {
        const opt = q.options.find((o) => o.value === raw);
        if (opt) return opt.label.ru;
    }
    return String(raw);
}

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        req.session.isAdmin = true;
        req.session.username = username;
        const ipHash = hashIp(req);
        await run(
            'INSERT INTO admin_logins (logged_at, ip_hash, username) VALUES (?, ?, ?)',
            [new Date().toISOString(), ipHash, username]
        );
        return res.json({ success: true });
    }
    res.status(401).json({ error: 'Invalid credentials' });
});

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

router.get('/responses', requireAdmin, async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
        const offset = (page - 1) * limit;

        const conditions = [];
        const params = [];

        if (req.query.consent) {
            conditions.push('consent = ?');
            params.push(req.query.consent);
        }
        if (req.query.is_complete !== undefined && req.query.is_complete !== '') {
            conditions.push('is_complete = ?');
            params.push(parseInt(req.query.is_complete, 10));
        }
        if (req.query.city) {
            conditions.push('city = ?');
            params.push(req.query.city);
        }
        if (req.query.date_from) {
            conditions.push('part1_at >= ?');
            params.push(req.query.date_from);
        }
        if (req.query.date_to) {
            conditions.push('part1_at <= ?');
            params.push(req.query.date_to + 'T23:59:59.999Z');
        }

        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const countRow = await get(`SELECT COUNT(*) as total FROM responses ${where}`, params);
        const rows = await all(
            `SELECT id, session_id, part1_at, part2_at, submitted_at, is_complete, consent, gender, age, city
             FROM responses ${where} ORDER BY part1_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        res.json({
            data: rows,
            pagination: {
                page,
                limit,
                total: countRow.total,
                pages: Math.ceil(countRow.total / limit)
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/responses/:id', requireAdmin, async (req, res) => {
    try {
        const row = await get('SELECT * FROM responses WHERE id = ?', [req.params.id]);
        if (!row) {
            return res.status(404).json({ error: 'Not found' });
        }

        const blocks = blocksConfig.map((block) => ({
            id: block.id,
            title: block.title.ru,
            questions: block.questions.map((key) => ({
                key,
                text: surveyData[key]?.text?.ru || key,
                value: formatValue(key, row[key]),
                raw: row[key]
            }))
        }));

        res.json({
            meta: {
                id: row.id,
                session_id: row.session_id,
                part1_at: row.part1_at,
                part2_at: row.part2_at,
                submitted_at: row.submitted_at,
                is_complete: row.is_complete,
                consent: row.consent,
                lang: row.lang,
                duration_seconds: row.duration_seconds,
                incomplete: row.consent === 'yes' && !row.is_complete
            },
            blocks
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/export.csv', requireAdmin, async (req, res) => {
    try {
        const rows = await all('SELECT * FROM responses ORDER BY part1_at DESC');
        const keys = ['id', 'session_id', 'part1_at', 'part2_at', 'submitted_at', 'is_complete', 'consent', 'lang', 'duration_seconds', ...getAllQuestionKeys()];

        const escape = (v) => {
            if (v === null || v === undefined) return '';
            const s = String(v).replace(/"/g, '""');
            return `"${s}"`;
        };

        const lines = [keys.join(',')];
        for (const row of rows) {
            lines.push(keys.map((k) => escape(row[k])).join(','));
        }

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="responses.csv"');
        res.send('\uFEFF' + lines.join('\n'));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
