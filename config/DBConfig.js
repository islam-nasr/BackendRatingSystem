const Sequelize = require("sequelize");

//local connection
const sequelize = new Sequelize('RatingSystem', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
  })

//cloud db
// const cloudDatabase = require('./keys').postgresURI
// const sequelize = new Sequelize(cloudDatabase)
module.exports = sequelize;
