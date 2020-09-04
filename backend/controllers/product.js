const Product = require('../models/product')
require('dotenv').config('.env')

const algoliasearch = require('algoliasearch')
const client = algoliasearch(process.env.ALGOLIA_APPID, process.env.ALGOLIA_BACKENDAPI_KEY)
const index = client.initIndex('dev_projetFinal')

exports.createProduct = (req, res, next) => {
  const product = new Product({ ...req.body.product })
  product.save()
    .then(() => {
      const searchedProduct = {
        objectID: product._id,
        name: product.name,
        price: product.price,
        sale: product.sale,
        image: product.imgSrc,
        categories: product.categories,
        brand: product.brand,
        tags: product.tags,
        dispo: (product.stock > 0)
      }
      index.saveObject(searchedProduct)
      res.status(201).json({ message: 'Produit ajouté', objectId: product._id })
    })
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

exports.getOneProductByName = (req, res, next) => {
  Product.findOne({ name: req.params.name })
    .then(product => res.status(200).json(product))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.getNLastProduct = (req, res, next) => {
  Product.find().limit(parseInt(req.params.n)).sort('-date')
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
  const product = new Product({ ...req.body.product })
  product._id = id
  Product.updateOne({ _id: id }, product)
    .then(() => {
      const searchedProduct = {
        objectID: product._id,
        name: product.name,
        price: product.price,
        sale: product.sale,
        image: product.imgSrc,
        categories: product.categories,
        brand: product.brand,
        tags: product.tags,
        dispo: (product.stock > 0)
      }
      index.saveObject(searchedProduct)
      res.status(201).json({ message: 'Produit mis à jour', objectId: id })
    })
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      index.deleteObject(req.params.id)
      res.status(201).json({ message: 'Produit supprime' })
    })
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}
