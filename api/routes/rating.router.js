const express = require("express");
const router = express.Router();
//const logger = require('../middleware/logger').logger;

// note that all imports happen at the beggining of the file
const ratingController = require("../controllers/rating.controller");
const {
    create
} = ratingController;
router.post("/create", create);

module.exports = router;