const express = require('express')
const router = express.Router()

const clientCtrl = require('../controllers/client')

const clientAuth = require('../middleware/clientAuth')
const adminAuth = require('../middleware/adminAuth')

router.get('/', adminAuth, clientCtrl.getAllClient)
router.get('/:id', clientAuth, clientCtrl.getOneClient)
router.get('/:id/a', adminAuth, clientCtrl.getOneClient)
router.put('/:id/a', adminAuth, clientCtrl.modifyClient)
router.put('/:id', clientAuth, clientCtrl.modifyClient)
router.delete('/:id/a', adminAuth, clientCtrl.deleteClient)
router.delete('/:id', clientAuth, clientCtrl.deleteClient)

module.exports = router
