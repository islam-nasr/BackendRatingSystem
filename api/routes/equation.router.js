const express = require("express");
//const logger = require('../middleware/logger').logger;

// note that all imports happen at the beggining of the file
const equationController = require("../controllers/equation.controller");

// exports.view = async (req, res) => {
//     const eq = await Equation.findByPk(req.body.id);
//     if (eq) return res.send(eq);
//     else return res.send("Equation not found");
//   };
//   exports.create = async (req, res) => {
//     try {
//       const eq = await Equation.create(req.body);
//       return res.send(eq);
//     } catch (exception) {
//       res.send("Something went worng");
//     }
//   };
//   exports.update = async (req, res) => {
//     try {
  
//       const eq = await Equation.findByPk(req.body.id);
//       if (!eq) return res.send("Equation not found");
//       await Equation.update({name:req.body.name,attributes:req.body.attributes }, { where: { id: req.body.id } });
//       return res.send("updated successfully");
//     } catch (exception) {
//       return res.send("Something went wrong");
//     }
//   };
//   exports.deleteO = async (req, res) => {
//     try {
//       const eq = await Equation.findByPk(req.body.id);
//       if (!eq) return res.send("Equation not found");
//       await Equation.destroy({ where: { id: req.body.id } });
//       return res.send("Equation deleted successfully");
//     } catch (exception) {
//       console.log(exception);
//       return res.send("Something went wrong");
//     }
//   };