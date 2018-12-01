import * as db from 'server/db.js';

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected! Rock on!');
});