const { Sequelize } = require('sequelize')
const databaseConfig = require('../config/database');
const Group = require('../models/Group');
const Match = require('../models/Match');
const Team = require('../models/Team');
const User = require('../models/User')
const Bet = require('../models/Bet')

const models = [User, Team, Match, Group, Bet];

const sequelize = new Sequelize({
  dialect: 'sqlite',
  database: './database.sqlite',
  logging: false
})

//const sequelize = new Sequelize(databaseConfig)

models
  .map(model => model.init(sequelize))
  .map(model => model.associate && model.associate(sequelize.models))

module.exports = sequelize