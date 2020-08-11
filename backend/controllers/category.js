const Category = require('../models/category')

exports.createCategory = (req, res, next) => {
  const category = new Category({ ...req.body.category })
  category.save()
    .then(() => res.status(201).json({ message: 'Categorie ajouté', objectId: category._id }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.getOneCategory = (req, res, next) => {
  Category.findOne({ _id: req.params.id })
    .then(category => res.status(200).json(category))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.getAllCategory = (req, res, next) => {
  Category.find()
    .then(categorys => res.status(200).json(categorys))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.modifyCategory = (req, res, next) => {
  const id = req.params.id
  delete req.body.category._id
  const category = new Category({ ...req.body.category })
  Category.updateOne({ _id: id }, category)
    .then(() => res.status(201).json({ message: 'Categorie mis à jour', objectId: id }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.deleteCategory = (req, res, next) => {
  Category.deleteOne({ _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Categorie supprime' }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}
