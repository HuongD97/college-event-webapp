const express = require('express');
const next = require('next');
const db = require('./db');
// Check if we're in the dev environment or production
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const PORT = process.env.PORT || 3000;
const getAll = require('./model/Users');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});

const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        // Connect to the database
        const server = express();
        server.get('/api/whoot', (req, res) => {
            res.json({ text: 'hello1' });
        });

        server.get('/getAll', (req, res) => {
            try {
                connection.connect(err => {
                    console.log('Connected!');
                    connection.query('SELECT * FROM Users', (err, result) => {
                        if (err) throw err;

                        console.log(JSON.stringify(result));
                        res.send(result);
                    });
                });
            } catch (e) {
                console.error(JSON.stringify(e));
            }
        });

        server.get('/create', (req, res) => {
            try {
                console.log('hitting post endpoint!');
                connection.connect(err => {
                    console.log('Connected!');
                    connection.query(
                        `INSERT INTO Users (firstName, lastName, email, uid) VALUES ('${
                            req.params.firstName
                        }', '${req.params.lastName}', '${
                            req.params.email
                        }', '${req.params.uid}')`,
                        (err, result) => {
                            console.log(JSON.stringify(result));
                            res.json({ success: true });
                        },
                    );
                });
            } catch (e) {
                console.error(JSON.stringify(e));
            }
        });

        server.get('/user', (req, res) => {
            try {
                const dest = '/loggedIn';
                connection.connect(err => {
                    console.log('Connected!');
                    connection.query(
                        `SELECT * FROM Users WHERE uid = '${req.query.uid}'`,
                        (err, result) => {
                            console.log(JSON.stringify(result));
                            app.render(req, res, dest, { user: result[0] });
                        },
                    );
                });
            } catch (e) {
                console.error(JSON.stringify(e));
            }
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log('> Read on http://localhost:3000');
        });

        // db.connect()
        //     .then(() => {
        //         server.listen(3000, err => {
        //             if (err) throw err;
        //             console.log('> Read on http://localhost:3000');
        //         });
        //     })
        //     .catch(err => console.error(JSON.stringify(err)));
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
