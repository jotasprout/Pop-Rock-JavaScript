import * as db from 'secrets/db.js';

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected! Rock on!');
});