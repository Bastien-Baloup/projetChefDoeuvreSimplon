const express = require('express')
const router = express.Router()

const adminAuth = require('../middleware/adminAuth')

const articleCtrl = require('../controllers/article')

router.post('/', adminAuth, articleCtrl.createArticle)
router.get('/', articleCtrl.getAllArticle)
router.get('/:id', articleCtrl.getOneArticle)
router.get('/byTitle/:title', articleCtrl.getOneArticleByTitle)
router.get('/last/:n', articleCtrl.getNLastArticle)
router.put('/:id', adminAuth, articleCtrl.modifyArticle)
router.delete('/:id', adminAuth, articleCtrl.deleteArticle)

module.exports = router
