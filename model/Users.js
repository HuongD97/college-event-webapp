const db = require('../db');

exports.getAll = (done) => {
    console.log('aaaaaaah');
    db.get().query('SELECT * FROM Users', (err, result) => {
        if (err) throw err;
        console.log('currently in exports.getAll', JSON.stringify(result));
        done(null, result);
    });
};
