const Article = require('../models/article')

exports.createArticle = (req, res, next) => {
  const article = new Article({ ...req.body.article })
  article.save()
    .then(() => res.status(201).json({ message: 'Article ajouté', objectId: article._id }))
    .catch(
      error => {
        if (error.name === 'ValidationError') {
          res.status(422).json({ error: error, message: 'Ce titre est déjà pris' })
        } else {
          res.status(400).json({ error: error })
          console.log(error)
        }
      }
    )
}

exports.getOneArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .then(article => res.status(200).json(article))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.getAllArticle = (req, res, next) => {
  Article.find()
    .then(articles => res.status(200).json(articles))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.getOneArticleByTitle = (req, res, next) => {
  Article.findOne({ title: req.params.title })
    .then(article => res.status(200).json(article))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.getNLastArticle = (req, res, next) => {
  Article.find().limit(parseInt(req.params.n)).sort('-date')
    .then(articles => res.status(200).json(articles))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.modifyArticle = (req, res, next) => {
  const id = req.params.id
  const article = new Article({ ...req.body.article })
  article._id = id
  Article.updateOne({ _id: id }, article)
    .then(() => res.status(201).json({ message: 'Article mis à jour', objectId: id }))
    .catch(
      error => {
        if (error.name === 'ValidationError') {
          res.status(422).json({ message: 'Ce titre est déjà pris' })
        } else {
          res.status(400).json({ error: error })
          console.log(error)
        }
      }
    )
}

exports.deleteArticle = (req, res, next) => {
  Article.deleteOne({ _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Article supprime' }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}
