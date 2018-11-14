const db = require('../db');

const ROLE_OPTIONS = {
    student: 'student',
    admin: 'admin',
    superadmin: 'superadmin',
};

exports.ROLE_OPTIONS = ROLE_OPTIONS;

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

const getUser = (uid, callback) => {
    const query = `SELECT * FROM Users where uid = '${uid}'`;
    const retVal = [];
    db.get()
        .query(query)
        .on('error', err => {
            callback(err);
        })
        .on('result', row => {
            retVal.push(row);
        })
        .on('end', () => {
            callback(null, { user: retVal[0] || {} });
        });
};

const getRole = (uid, callback) => {
    console.log('AGGGGGH');
    const superadminQuery = `SELECT * FROM Superadmins where superadmin_id = '${uid}'`;
    const adminQuery = `SELECT * FROM Admins where admin_id = '${uid}'`;
    const retVal = [];
    let role = ROLE_OPTIONS.student;
    db.get().query(adminQuery, (err, results, fields) => {
        if (err) callback(err);
        else {
            if (results.length > 0) {
                role = ROLE_OPTIONS.admin;
            }

            db.get().query(superadminQuery, (err, results, fields) => {
                if (err) callback(err);
                else {
                    if (results.length > 0) {
                        role = ROLE_OPTIONS.superadmin;
                    }

                    callback(null, role);
                }
            });
        }
    });
};

exports.getUserAndRole = (uid, callback) => {
    getUser(uid, (err, data) => {
        if (err) callback(err);
        else {
            const { user } = data;
            getRole(uid, (err, role) => {
                if (err) callback(err, null);
                else {
                    user.role = role;
                    callback(null, user);
                }
            });
        }
    });
};

exports.create = (firstName, lastName, email, uid, university, callback) => {
    const retVal = {};
    const query = `INSERT INTO Users (firstName, lastName, email, university, uid) VALUES ('${firstName}', '${lastName}', '${email}', '${university}', '${uid}')`;

    db.get()
        .query(query)
        .on('error', err => (retVal.error = err))
        .on('result', result => {
            retVal.success = true;
        })
        .on('end', () => callback(retVal));
};
