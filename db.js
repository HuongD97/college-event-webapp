const mysql = require('mysql');

let state = {
    pool: null,
};

exports.connect = () => {
    return new Promise(resolve => {
        try {
            state.pool = mysql.createPool({
                host: process.env.host,
                user: process.env.user,
                password: process.env.password,
                database: process.env.database,
            });
            resolve();
        } catch (e) {
            throw e;
        }
    });
};

exports.get = () => {
    console.log(`state.pool ${state.pool}`);
    return state.pool;
};
