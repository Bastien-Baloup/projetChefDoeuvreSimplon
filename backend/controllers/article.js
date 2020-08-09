const Article = require('../models/article')

exports.createArticle = (req, res, next) => {
  const article = new Article({ ...req.body.article })
  article.save()
    .then(() => res.status(201).json({ message: 'Article ajouté', objectId: article._id }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.getOneArticle = (req, res, next) => {
  Article.findOne({
    _id: req.params.id
  })
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

exports.modifyArticle = (req, res, next) => {
  const id = req.body.article._id
  delete req.body.article._id
  const article = new Article({ ...req.body.article })
  Article.updateOne({ _id: id }, article)
    .then(() => res.status(201).json({ message: 'Article mis à jour', objectId: id }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.deleteArticle = (req, res, next) => {
  const id = req.body.article._id
  Article.deleteOne({ _id: id })
    .then(() => res.status(201).json({ message: 'Article supprime', objectId: id }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}
