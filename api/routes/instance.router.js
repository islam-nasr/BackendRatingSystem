const express = require("express");
const router = express.Router();
//const logger = require('../middleware/logger').logger;

// note that all imports happen at the beggining of the file
const instanceController = require("../controllers/instance.controller");
const {
    ObjectInstanceDetailsInquiry,
    CreateObjectInstance,
    //deleteInstance,
    //update,
    ObjectInstanceListInquiry,
    InstanceUserRatingListInquiry
} = instanceController;
router.post("/CreateObjectInstance", CreateObjectInstance);
//router.post("/delete", deleteInstance);
router.post("/ObjectInstanceDetailsInquiry", ObjectInstanceDetailsInquiry);
//router.post("/update", update);
router.post("/ObjectInstanceListInquiry", ObjectInstanceListInquiry);
router.post("/InstanceUserRatingListInquiry", InstanceUserRatingListInquiry);

module.exports = router;