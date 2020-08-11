const Product = require('../models/product')

exports.createProduct = (req, res, next) => {
  const product = new Product({ ...req.body.product })
  product.save()
    .then(() => res.status(201).json({ message: 'Produit ajouté', objectId: product._id }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.getOneProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json(product))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.getAllProduct = (req, res, next) => {
  Product.find()
    .then(products => res.status(200).json(products))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.modifyProduct = (req, res, next) => {
  const id = req.params.id
  delete req.body.product._id
  const product = new Product({ ...req.body.product })
  Product.updateOne({ _id: id }, product)
    .then(() => res.status(201).json({ message: 'Produit mis à jour', objectId: id }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Produit supprime' }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}
