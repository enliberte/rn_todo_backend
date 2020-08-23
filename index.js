const express = require('express');
const port = process.env.PORT || 8080;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {});
const eventHandlers = require('./eventHandlers');

io.on('connection', socket => {
    eventHandlers.forEach(({event, createHandler}) => {
        socket.on(event, createHandler(socket))
    });
});

app.get('/', (req, res) => res.send(port));

server.listen(port);
