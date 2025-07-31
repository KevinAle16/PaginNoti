const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Yorch0711!',
    database: 'pagNoti'
});

module.exports = db;