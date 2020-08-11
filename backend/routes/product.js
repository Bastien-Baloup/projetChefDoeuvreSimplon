const express = require('express')
const router = express.Router()

const adminAuth = require('../middleware/adminAuth')

const productCtrl = require('../controllers/product')

router.post('/', adminAuth, productCtrl.createProduct)
router.get('/', productCtrl.getAllProduct)
router.get('/:id', productCtrl.getOneProduct)
router.put('/:id', adminAuth, productCtrl.modifyProduct)
router.delete('/:id', adminAuth, productCtrl.deleteProduct)

module.exports = router
