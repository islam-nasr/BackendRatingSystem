const express = require("express");
const router = express.Router();
//const logger = require('../middleware/logger').logger;

// note that all imports happen at the beggining of the file
const instanceController = require("../controllers/instance.controller");
const {
    view,
    create,
    //deleteInstance,
    //update,
    viewAll,
    viewRatingList
} = instanceController;
router.post("/create", create);
//router.post("/delete", deleteInstance);
router.post("/view", view);
//router.post("/update", update);
router.post("/viewAll", viewAll);
router.post("/viewRatingList", viewRatingList);

module.exports = router;