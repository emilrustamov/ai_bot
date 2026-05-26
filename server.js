require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const { initDb } = require('./db/init');
const { submitLimiter } = require('./middleware/rateLimit');
const requireAdmin = require('./middleware/requireAdmin');
const submitRoutes = require('./routes/submit');
const adminRoutes = require('./routes/adminApi');
const healthRoutes = require('./routes/health');
const { applySecurity } = require('./middleware/security');

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

applySecurity(app, isProd);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'dev_secret_change_me',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use('/api/submit', submitLimiter);
app.use('/api/submit', submitRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/health', healthRoutes);

app.get('/admin', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

app.get('/admin/responses/:id', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'detail.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

initDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server: http://localhost:${PORT}`);
            console.log(`Admin:  http://localhost:${PORT}/admin/login.html`);
        });
    })
    .catch((err) => {
        console.error('DB init failed:', err.message);
        process.exit(1);
    });
