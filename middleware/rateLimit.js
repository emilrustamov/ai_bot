const rateLimit = require('express-rate-limit');

const submitLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Too many submissions, please try again later' },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = { submitLimiter };
