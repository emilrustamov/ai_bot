const helmet = require('helmet');

function applySecurity(app, isProd) {
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.tailwindcss.com'],
                styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdn.tailwindcss.com'],
                fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
                connectSrc: ["'self'"],
                imgSrc: ["'self'", 'data:'],
                frameAncestors: ["'none'"]
            }
        },
        crossOriginEmbedderPolicy: false,
        hsts: isProd ? { maxAge: 31536000, includeSubDomains: true } : false
    }));
}

module.exports = { applySecurity };
