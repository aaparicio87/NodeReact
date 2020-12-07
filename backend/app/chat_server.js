const socketio = require('socket.io');

// Controllers
const ChatController = require('./controllers/ChatController');

module.exports = (server) => {
    const io = socketio(server);

    // Run when client connects 
    io.on("connection", (socket) => {

            socket.on("Input chat message", (chat) => {
                const chat_recived = ChatController.add(chat);
                // we tell the client to execute 'new message'
                socket.broadcast.emit('Output chat message', {
                    chat_recived
                });
            });

            // when the client emits 'typing', we broadcast it to others
            socket.on('typing', () => {
                socket.broadcast.emit('typing', {
                    username: socket.username
                });
            });

            // when the client emits 'stop typing', we broadcast it to others
            socket.on('stop typing', () => {
                socket.broadcast.emit('stop typing', {
                    username: socket.username
                });
            });

            // when the user disconnects.. perform this
            socket.on('disconnect', () => {
                    // echo globally that this client has left
                    socket.broadcast.emit('user left', {
                        username: socket.username,

                    });
            });
    });
}