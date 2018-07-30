var express = require('express');
var app = express();
var expressConfig = require('./config/express');
var registerRoutes = require('./routes');

const db = require('./config/db.config');
const {port} = require('./config/env');

expressConfig(app);
registerRoutes(app);

// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('DB initialized...');
});
 
 
// Create a Server
app.listen(port, function () {
  console.log("Server listening on port:", port)
})