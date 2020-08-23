const express = require('express')
const router = express.Router()
const orderCtrl = require('../controllers/order')

router.post('/create-session', orderCtrl.createCheckoutSession)

module.exports = router
