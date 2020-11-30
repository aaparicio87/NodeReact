const express = require('express');
const app = express();
const { sequelize } = require('./models/index');
const cors = require('cors')

//Settings
app.set('port', process.env.PORT || 8000);

//Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(require('./routes'));


app.listen(app.get('port'),()=>{
  console.log("Start server on port "+app.get('port'))
  sequelize.authenticate().then(() => {
      console.log('We are conected');
  })
})