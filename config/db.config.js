const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  operatorsAliases: false,
  logging: false,
 
//   pool: {
//     max: env.max,
//     min: env.pool.min,
//     acquire: env.pool.acquire,
//     idle: env.pool.idle
//   }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.User = require('../api/user/user.model')(sequelize, Sequelize);

module.exports = db;
