const socketio = require('socket.io');

// Controllers
const MessageController = require('./controllers/MessageController');
const ConversationController = require('./controllers/ConversationController');
const AuthController = require('./controllers/AuthController');

module.exports = (server) => {
    const io = socketio(server);

    // Run when client connects 
    io.on("connection", (socket) => {
        console.log('New user conected')
        socket.on('conversation', (data) => {
            const conversation = ConversationController(data);


            const user = AuthController.userFindByPk(conversation.user_id);

            // Broadcast when a user connects
            socket.broadcast
                .to(conversation.title)
                .emit(
                    'join', { user, conversation }
                );

            socket.on("new message", (msg) => {
                MessageController.add(msg);
                // we tell the client to execute 'new message'
                socket.broadcast.emit('new message', {
                    message: msg
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
                if (addedUser) {
                    --numUsers;

                    // echo globally that this client has left
                    socket.broadcast.emit('user left', {
                        username: socket.username,
                        numUsers: numUsers
                    });
                }
            });

        })
    });
}