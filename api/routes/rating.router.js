const express = require("express");
const router = express.Router();
//const logger = require('../middleware/logger').logger;

// note that all imports happen at the beggining of the file
const ratingController = require("../controllers/rating.controller");
const {
    RateInstance
} = ratingController;
router.post("/RateInstance", RateInstance);

module.exports = router;