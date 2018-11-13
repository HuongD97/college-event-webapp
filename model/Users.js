const db = require('../db');

exports.getAll = callback => {
    const query = `SELECT * FROM Users`;
    const retVal = { err: null, result: [] };

    db.get()
        .query(query)
        .on('error', err => (retVal.error = err))
        .on('result', row => {
            retVal.result.push(row);
        })
        .on('end', () => callback(retVal));
};

exports.getUser = (uid, callback) => {
    const query = `SELECT * FROM Users where uid = '${uid}'`;
    const retVal = [];
    db.get()
        .query(query)
        .on('error', err => {
            console.error(err);
        })
        .on('result', row => {
            retVal.push(row);
        })
        .on('end', () => {
            callback({ user: retVal[0] || {} });
        });
};

exports.create = (firstName, lastName, email, uid, callback) => {
    const retVal = {};
    const query = `INSERT INTO Users (firstName, lastName, email, uid) VALUES ('${firstName}', '${lastName}', '${email}', '${uid}')`;

    db.get()
        .query(query)
        .on('error', err => (retVal.error = err))
        .on('result', result => {
            retVal.success = true;
        })
        .on('end', () => callback(retVal));
};
