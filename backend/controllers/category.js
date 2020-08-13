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
  const category = new Category({ ...req.body.category })
  category._id = id
  Category.updateOne({ _id: id }, category)
    .then(() => res.status(201).json({ message: 'Categorie mis à jour', objectId: id }))
    .catch(
      error => {
        if (error.name === 'MongoError' && error.code === 11000) {
          res.status(422).json({ error: error, message: 'Ce nom de catégorie est déjà pris' })
        } else {
          res.status(400).json({ error: error })
          console.log(error.name)
        }
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
