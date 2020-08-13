const express = require('express')
const router = express.Router()

const adminAuth = require('../middleware/adminAuth')
const clientAuth = require('../middleware/clientAuth')

const adminCtrl = require('../controllers/admin')
const clientCtrl = require('../controllers/client')

router.post('/admin/signup', adminAuth, adminCtrl.signup)
router.post('/admin/login', adminCtrl.login)
router.get('/admin/checkLogin', adminAuth, (req, res, next) => res.status(200).json({ message: 'vous êtes bien connecté' }))

router.post('/client/signup', clientCtrl.signup)
router.post('/client/login', clientCtrl.login)
router.get('/client/checkLogin', clientAuth, (req, res, next) => res.status(200).json({ message: 'vous êtes bien connecté' }))

router.get('/disconnect', (req, res, next) => res.status(401).json({ message: 'Déconnection' }))

module.exports = router
