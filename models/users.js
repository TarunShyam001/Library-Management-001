const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id : {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  regId: {
    type : Sequelize.INTEGER,
    allowNull : false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isAdmin : {
    type : Sequelize.BOOLEAN,
    allowNull : false
  },
  totalFinePaid : {
    type : Sequelize.FLOAT,
    defaultValue : 0
  }
});

module.exports = User;
