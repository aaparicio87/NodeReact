const express = require('express');
const app = express();
const { sequelize } = require('./models/index');
const cors = require('cors')
const chatServer = require('./chat_server');


//Settings
app.set('port', process.env.PORT || 8000);

//Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(require('./routes'));


const server = app.listen(app.get('port'), () => {
    console.log("Start server on port " + app.get('port'))
    sequelize.sync({ force: false })
        .then(() => {
            console.log('We are conected');
        })
        .catch(() => {
            console.log('There is problem with the database conection');
        })
})

chatServer(server);