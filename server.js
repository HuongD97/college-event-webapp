const express = require('express');
const next = require('next');
// Check if we're in the dev environment or production
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const PORT = process.env.PORT || 3000;
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
            const { firstName, lastName, email, uid, university } = req.body;
            console.log(req.body);
            if (!firstName || !lastName || !email || !uid || !university) {
                return res.status(500).json({
                    error: `First name, last name, email, university, or uid is missing`,
                });
            }

            Users.create(firstName, lastName, email, uid, university, result =>
                res.json(result),
            );
        });

        server.get('/allUsers', (req, res) => {
            Users.getAll(result => res.json(result));
        });

        server.get('/user', (req, res) => {
            const dest = '/loggedIn';
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

        server.get('/test', (req, res) => {
            Users.getUserAndRole('HmIYKjmPmrY1H9babReo2iKywWT2', (err, data) => {
                console.log('err', err);
                console.log('data', data);
                if (err) res.json(err);
                else res.json({ user: data});
            });
        });

        server.get('/', (req, res) => app.render(req, res, '/index'));

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
