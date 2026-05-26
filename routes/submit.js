const express = require('express');
const { run, get } = require('../db/connection');
const { serializeValue } = require('../db/columns');
const { validatePayload } = require('../middleware/validateSubmit');
const { hashIp } = require('../utils/ipHash');
const {
    surveyData,
    getPart1Keys,
    getPart2Keys
} = require('../config/schema');

const router = express.Router();

function buildRowValues(data, keys) {
    const values = {};
    for (const key of keys) {
        if (!surveyData[key]) continue;
        values[key] = serializeValue(surveyData[key], data[key]);
    }
    return values;
}

router.post('/part1', async (req, res) => {
    try {
        const data = req.body;
        const errors = validatePayload(data, 'part1');
        if (errors.length) {
            return res.status(400).json({ error: errors.join('; ') });
        }

        const consent = data.consent;
        const keys = getPart1Keys(consent);
        const rowValues = buildRowValues(data, keys);
        const now = new Date().toISOString();
        const isComplete = consent === 'no' ? 1 : 0;
        const ipHash = hashIp(req);
        const userAgent = req.headers['user-agent'] || '';

        const existing = await get('SELECT id, session_id FROM responses WHERE session_id = ?', [data.session_id]);

        if (existing) {
            const setCols = Object.keys(rowValues).map((k) => `${k} = ?`).join(', ');
            const params = [
                ...Object.values(rowValues),
                data.lang || 'ru',
                isComplete,
                userAgent,
                ipHash,
                now,
                existing.id
            ];
            await run(
                `UPDATE responses SET ${setCols}, lang = ?, is_complete = ?, user_agent = ?, ip_hash = ?, part1_at = ? WHERE id = ?`,
                params
            );
            return res.json({ success: true, id: existing.id, session_id: data.session_id, is_complete: isComplete });
        }

        const cols = ['session_id', 'part1_at', 'lang', 'is_complete', 'user_agent', 'ip_hash', ...Object.keys(rowValues)];
        const placeholders = cols.map(() => '?').join(', ');
        const params = [
            data.session_id,
            now,
            data.lang || 'ru',
            isComplete,
            userAgent,
            ipHash,
            ...Object.values(rowValues)
        ];

        const result = await run(
            `INSERT INTO responses (${cols.join(', ')}) VALUES (${placeholders})`,
            params
        );

        res.json({ success: true, id: result.lastID, session_id: data.session_id, is_complete: isComplete });
    } catch (err) {
        console.error('part1 error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

router.patch('/part2', async (req, res) => {
    try {
        const data = req.body;
        const errors = validatePayload(data, 'part2');
        if (errors.length) {
            return res.status(400).json({ error: errors.join('; ') });
        }

        const existing = await get('SELECT id, part1_at, consent FROM responses WHERE session_id = ?', [data.session_id]);
        if (!existing) {
            return res.status(404).json({ error: 'Session not found. Submit part 1 first.' });
        }
        if (existing.consent !== 'yes') {
            return res.status(400).json({ error: 'Part 2 not required for this session' });
        }

        const keys = getPart2Keys();
        const rowValues = buildRowValues(data, keys);
        const part2At = new Date().toISOString();
        const part1At = new Date(existing.part1_at);
        const durationSeconds = Math.round((new Date(part2At) - part1At) / 1000);

        const setCols = Object.keys(rowValues).map((k) => `${k} = ?`).join(', ');
        const params = [
            ...Object.values(rowValues),
            part2At,
            part2At,
            1,
            durationSeconds,
            data.lang || 'ru',
            existing.id
        ];

        await run(
            `UPDATE responses SET ${setCols}, part2_at = ?, submitted_at = ?, is_complete = 1, duration_seconds = ?, lang = ? WHERE id = ?`,
            params
        );

        res.json({ success: true, id: existing.id, session_id: data.session_id });
    } catch (err) {
        console.error('part2 error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
