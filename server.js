const express = require('express');
const next = require('next');
// Check if we're in the dev environment or production
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Users = require('./model/Users');
const RSOs = require('./model/RSOs');
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

        server.post('/universityStudents', jsonParser, (req, res) => {
            const { university } = req.body;

            RSOs.getAllStudentsFromUniversity(university, (err, data) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json({ allStudents: data });
                }
            });
        });

        server.post('/universityRSOs', jsonParser, (req, res) => {
            const { university } = req.body;

            RSOs.getAllRSOsFromUni(university, (err, data) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json({ allRSOs: data });
                }
            });
        });

        server.post('/createRSO', jsonParser, (req, res) => {
            const rsoInfo = { ...req.body.rsoInfo };

            RSOs.createRSO(rsoInfo, (err, data) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(data);
                }
            });
        });

        server.post('/user', jsonParser, (req, res) => {
            const { uid } = req.body;
            if (!uid) {
                return res.status(500).json({
                    error: `Must provide a uid.`,
                });
            }
            Users.getUserAndRole(uid, (err, data) => {
                if (err) res.json(err);
                else res.json({ user: data });
            });
        });

        server.get('/test', (req, res) => {
            // RSOs.addAdmin(
            //     'Lz06QvpZyhfjqpLgyGDV1E51Ety2',
            //     (err, data, fields, anythingelse) => {
            //         console.log('err', err);
            //         console.log('data', data);
            //         if (err) res.json(err);
            //         else res.json({ rso: data, fields: fields, anythingelse: anythingelse});
            //     },
            // );
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
//
// , {
//     email: "huongd97@gmail.com"
//     firstName: "Huong"
//     lastName: "Dang"
//     uid: "aZGhRZnWdHY2P9iEY7uM34gXCKA3"
//     university: "University of Central Florida"
// }, {
//     email: "jessicajung@ucf.edu"
//     firstName: "Jessica"
//     lastName: "Jung"
//     uid: "Lz06QvpZyhfjqpLgyGDV1E51Ety2"
//     university: "University of Central Florida"
//
// },{
//     email: "husstam@ucf.edu"
//     firstName: "Huss"
//     lastName: "Tam"
//     uid: "qp5w2FlPUdMQUiqfewiUx7Tnnpv2"
//     university: "University of Central Florida"
// }
