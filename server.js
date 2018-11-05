const express = require('express');
const next = require('next');

// Check if we're in the dev environment or production
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const PORT = process.env.PORT || 3000;

const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.get('/p/:id', (req, res) => {
            const actualPage = '/post';
            const queryParams = { title: req.params.id };

            // Not sure what this line is doing. But pretty
            // sure it's routing the incoming request to the masked
            // route to the actual route
            app.render(req, res, actualPage, queryParams);
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log('> Read on http://localhost:3000');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
