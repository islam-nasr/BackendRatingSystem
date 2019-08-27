const Sequelize = require("sequelize");
const sequelize = require("../config/DBConfig");
const Model = Sequelize.Model;

class Scale extends Model{}
Scale.init(
    {
        id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    }
},
{
  sequelize,
  paranoid: true
}
);
module.exports = Scale;
