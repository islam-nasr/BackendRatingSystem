const express = require('express')
const router = express.Router()

const serviceListController = require('../controllers/serviceList.controller')

const { viewList } = serviceListController
router.get('/explore', viewList)

module.exports = router
