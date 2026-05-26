const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../data/database.db');
const backupsDir = path.join(__dirname, '../backups');

if (!fs.existsSync(src)) {
    console.error('Database not found:', src);
    process.exit(1);
}

if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
}

const date = new Date().toISOString().slice(0, 10);
const dest = path.join(backupsDir, `database_${date}.db`);
fs.copyFileSync(src, dest);
console.log('Backup saved:', dest);
