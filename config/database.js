const { Sequelize } = require('sequelize');

const db = new Sequelize('Name', 'User', 'Password', {
    dialect: 'sqlite',
    host: './db.sqlite'
});

module.exports = db;