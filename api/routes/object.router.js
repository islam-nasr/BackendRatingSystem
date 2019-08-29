const express = require("express");
const router = express.Router();
//const logger = require('../middleware/logger').logger;

// note that all imports happen at the beggining of the file
const objectController = require("../controllers/object.controller");
const {
    viewAllObjects,
    CreateObject,
    //deleteObject,
    //update,
    view
} = objectController
router.post("/CreateObject", CreateObject)
//router.post("/delete", deleteObject)
router.post("/viewAllObjects", viewAllObjects)
//router.post("/update", update)
router.post("/view", view)

module.exports = router;