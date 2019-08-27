const Sequelize = require("sequelize");
const sequelize = require("../config/DBConfig");
const Model = Sequelize.Model;
const Equation = require("./equation.model");
const Scale = require("./scale.model");
const Instance = require("./instance.model");

class Object extends Model { }
Object.init(
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
        AttributeList: {
            type: Sequelize.ARRAY(Sequelize.JSON),
            defaultValue: [
                {
                    name: null,
                    weight: null
                }
            ]


        }
    },
    {
        sequelize,
        paranoid: true
    }
);
Equation.hasMany(Object);
Object.belongsTo(Equation);
Object.belongsTo(Scale);
Scale.hasMany(Object);
Object.hasMany(Instance);
Instance.belongsTo(Object);
module.exports = Object;
