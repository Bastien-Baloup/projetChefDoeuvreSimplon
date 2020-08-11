const express = require('express')
const router = express.Router()

const adminAuth = require('../middleware/adminAuth')

const adminCtrl = require('../controllers/admin')
const clientCtrl = require('../controllers/client')

router.post('/admin/signup', adminAuth, adminCtrl.signup)
router.post('/admin/login', adminCtrl.login)
router.post('/client/signup', clientCtrl.signup)
router.post('/client/login', clientCtrl.login)

module.exports = router
