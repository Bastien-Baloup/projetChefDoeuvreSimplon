const express = require('express')
const router = express.Router()

const adminAuth = require('../middleware/adminAuth')

const adminCtrl = require('../controllers/admin')

router.post('/signup', adminCtrl.signup)
router.post('/login', adminCtrl.login)
router.get('/', adminAuth, adminCtrl.getAllAdmin)
router.get('/:id', adminAuth, adminCtrl.getOneAdmin)
router.put('/:id', adminAuth, adminCtrl.modifyAdmin)
router.delete('/:id', adminAuth, adminCtrl.deleteAdmin)

module.exports = router
