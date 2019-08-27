const Sequelize = require("sequelize");
const sequelize = require("../config/DBConfig");
const Model = Sequelize.Model;
const Rating = require("./rating.model");
const Rank = require("./rank.model");

class Instance extends Model { }
Instance.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    OverAllRating:{
      type:Sequelize.DOUBLE,
      allowNull:false,
      defaultValue:0.1
    },
    AttributeListOverAllRating: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: [
          {
              name: null,
              rate: 0.1
          }
      ]


  }
  },
  {
    sequelize,
    paranoid: true
  }
);
Rating.belongsTo(Instance);
Instance.hasMany(Rating);
Rank.belongsTo(Instance);
Instance.hasOne(Rank);
module.exports = Instance;
