const express   = require('express');
const env       = require('./env');
const routes    = require('./routes');

const app = express();
app.use(express.json());
app.use('/', routes);

// ...
// Healthcheck
app.get("/healthz", (req, res) => {
    res.send({ success: true, message: "200 (OK)" });
});

const server = app.listen(env.port, () => {
    console.log(`Listening on port ${env.port}`)
});

// ...
// Shut down gracefully

process.on('SIGTERM', () => {
    console.log('Closing idle connections...')
    server.closeIdleConnections()
    console.log('The service is about to shut down!');
    
    // Finish any outstanding requests, then...
    process.exit(0); 
});