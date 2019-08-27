const Sequelize = require('sequelize')
const keys = require('./keys')

// Connecting to local postgres
// const sequelize = new Sequelize('DMS', 'postgres', '123456789', {
//   host: 'localhost',
//   dialect: 'postgres'
// })

// Connecting to remote postgres
const sequelize = new Sequelize(keys.postgresURI)

module.exports = sequelize
