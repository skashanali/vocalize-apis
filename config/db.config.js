const {env} = require('./env');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, env.options);
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.User = require('../api/user/user.model')(sequelize, Sequelize);

module.exports = db;
