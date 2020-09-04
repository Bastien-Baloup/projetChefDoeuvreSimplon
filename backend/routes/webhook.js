const express = require('express')
const router = express.Router()
const orderCtrl = require('../controllers/order')
const bodyParser = require('body-parser')

router.use('/', orderCtrl.handleWebhook, bodyParser.json(), orderCtrl.createOrder)

module.exports = router
