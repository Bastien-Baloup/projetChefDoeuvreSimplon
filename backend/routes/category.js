const express = require('express')
const router = express.Router()

const adminAuth = require('../middleware/adminAuth')

const categoryCtrl = require('../controllers/category')

router.post('/', adminAuth, categoryCtrl.createCategory)
router.get('/', categoryCtrl.getAllCategory)
router.get('/:id', categoryCtrl.getOneCategory)
router.put('/:id', adminAuth, categoryCtrl.modifyCategory)
router.delete('/:id', adminAuth, categoryCtrl.deleteCategory)

module.exports = router
