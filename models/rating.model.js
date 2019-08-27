const Sequelize = require("sequelize");
const sequelize = require("../config/DBConfig");
const Model = Sequelize.Model;

class Rating extends Model{}
Rating.init(
    {
        id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Note:{
        type:Sequelize.STRING,
        allowNull:true  
    },
    AttributeRatings:{
        type:Sequelize.ARRAY(Sequelize.JSON),
        allowNull:false,
        defaultValue:[
            {   
                name:null,
                weight:null,
                rate:0.1
            }
        ]
    },
    overAllRating:{
        type:Sequelize.DOUBLE,
        allowNull:false,
        defaultValue:0.1
    }

    //instance ID FOREIGN KEY
    
},
{
  sequelize,
  paranoid: true
}
);
module.exports = Rating;
