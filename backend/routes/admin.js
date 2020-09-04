const express = require('express')
const router = express.Router()

const adminAuth = require('../middleware/adminAuth')

const adminCtrl = require('../controllers/admin')

router.get('/', adminAuth, adminCtrl.getAllAdmin)
router.get('/:id', adminAuth, adminCtrl.getOneAdmin)
router.put('/:id', adminAuth, adminCtrl.modifyAdmin)
router.delete('/:id', adminAuth, adminCtrl.deleteAdmin)

module.exports = router
