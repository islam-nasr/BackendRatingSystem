const Sequelize = require("sequelize");
const sequelize = require("../config/DBConfig");
const Model = Sequelize.Model;

class Equation extends Model{}
Equation.init(
    {
        id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false  
    },
    formula:{
        type:Sequelize.STRING,
        allowNull:false  
    }
},
{
  sequelize,
  paranoid: true
}
);
module.exports = Equation;
