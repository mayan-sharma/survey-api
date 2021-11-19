const { DataTypes } = require('sequelize');

const db = require('../config/database');

// sync and connect with db
db.sync().then(() => console.log('DB synced!')).catch(err => console.error(err));
db.authenticate().then(() => console.log('Db connected...')).catch(err => console.error(err));

// define and import models
db.Survey = require('./Survey')(db, DataTypes);
db.Question = require('./Question')(db, DataTypes);
db.Response = require('./Response')(db, DataTypes);

// model relations

// 1 to many
db.Survey.hasMany(db.Question);
db.Question.belongsTo(db.Survey);

// 1 to many
db.Question.hasMany(db.Response);
db.Response.belongsTo(db.Question);

module.exports = db;