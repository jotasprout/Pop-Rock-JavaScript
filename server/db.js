// Note to self: Actual file with creds in '/secrets'

const mysql = require('mysql');

const connection = mysql.createConnection ({
    host: 'localhost',
    database: 'database',
    user: 'user',
    password: 'pw'
});