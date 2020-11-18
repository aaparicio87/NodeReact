const express = require('express');
const app = express();
const { sequelize } = require('./models/index');

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());

// Rutas
app.use(require('./routes'));


app.listen(app.get('port'),()=>{
  console.log("Start server on port "+app.get('port'))
  sequelize.authenticate().then(() => {
      console.log('We are conected');
  })
})