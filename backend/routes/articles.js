const express = require('express')
const router = express.Router()

const Article = require('../models/article')

router.post('/new',
  (req, res, next) => {
    const article = new Article({ ...req.body })
    article.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
      .catch(error => res.status(400).json({ error }))
  }
)

module.exports = router
