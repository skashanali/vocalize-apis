var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var registerRoutes = require('./app/routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
 
const db = require('./app/config/db.config');

const port = 8000;
  
registerRoutes(app);

// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('DB initialized...');
});
 
 
// Create a Server
app.listen(port, function () {
  console.log("Server listening on port:", port)
})