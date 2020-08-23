const io = require('socket.io')({});
const eventHandlers = require('./eventHandlers');

io.on('connection', socket => {
    eventHandlers.forEach(({event, createHandler}) => {
        socket.on(event, createHandler(socket))
    });
});

io.listen(3000);
