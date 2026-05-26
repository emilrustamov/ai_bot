const express = require('express');
const { get } = require('../db/connection');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await get('SELECT 1');
        res.json({ ok: true, db: true });
    } catch {
        res.status(503).json({ ok: false, db: false });
    }
});

module.exports = router;
