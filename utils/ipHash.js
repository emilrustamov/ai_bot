const crypto = require('crypto');

function hashIp(req) {
    const salt = process.env.IP_HASH_SALT || 'default_salt';
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || '';
    return crypto.createHash('sha256').update(ip + salt).digest('hex');
}

module.exports = { hashIp };
