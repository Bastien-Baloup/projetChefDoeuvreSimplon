const express = require('express')
const router = express.Router()

const adminAuth = require('../middleware/adminAuth')

const orderCtrl = require('../controllers/order')

router.post('/', orderCtrl.createOrder)
router.get('/', adminAuth, orderCtrl.getAllOrder)
router.get('/:id', orderCtrl.getOneOrder)
router.put('/:id', adminAuth, orderCtrl.modifyOrder)
router.delete('/:id', adminAuth, orderCtrl.deleteOrder)

module.exports = router
