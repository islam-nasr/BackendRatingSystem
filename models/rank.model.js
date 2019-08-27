const Sequelize = require("sequelize");
const sequelize = require("../config/DBConfig");
const Model = Sequelize.Model;

class Rank extends Model{}
Rank.init(
    {
        id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    objectRank:{
        type:Sequelize.DOUBLE,
        allowNull:false  
    },
    weighedAttributes:{
        type:Sequelize.ARRAY(Sequelize.JSON),
        defaultValue:[
            {   
                name:null,
                weight:null,
                rating:null
            }
        ]

    
    }
},
{
  sequelize,
  paranoid: true
}
);
module.exports = Rank;
