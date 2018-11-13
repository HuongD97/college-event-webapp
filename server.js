const express = require('express');
const next = require('next');
// Check if we're in the dev environment or production
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const PORT = process.env.PORT || 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Users = require('./model/Users');
const database = require('./db');

const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        // Connect to the database
        const server = express();

        // Make a database connection
        database.connect();

        server.post('/create', jsonParser, (req, res) => {
            const { firstName, lastName, email, uid } = req.body;
            if (!firstName || !lastName || !email || !uid) {
                return res.status(500).json({
                    error: `First name, last name, email, or uid is missing`,
                });
            }

            Users.create(firstName, lastName, email, uid, result =>
                res.json(result),
            );
        });

        server.get('/allUsers', (req, res) => {
            Users.getAll(result => res.json(result));
        });

        server.get('/user', (req, res) => {
            const dest = '/loggedIn';
            const failDest = '/';
            const retVal = { user: null, error: null };
            const { uid } = req.query;

            if (!uid) {
                return res.status(500).json({
                    error: `No uid provided!`,
                });
            }
            Users.getUser(uid, result => {
                app.render(req, res, dest, { user: result.user });
            });
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(PORT, err => {
            if (err) throw err;
            console.log('> Read on http://localhost:3000');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
