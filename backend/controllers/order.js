const Order = require('../models/order')
const Product = require('../models/product')

const algoliasearch = require('algoliasearch')
const client = algoliasearch('H2YGA5NBNG', '26c633cd2792a5a165314b26bebf1e60')
const index = client.initIndex('dev_projetFinal')

exports.createOrder = (req, res, next) => {
  const order = new Order({ ...req.body.order })

  const checkOrderFunction = ({ products }, resolve, reject) => {
    products.forEach(
      orderProduct => {
        Product.findOne({ _id: orderProduct.product_id })
          .then(
            product => {
              if (!product) {
                throw new Error('Produit invallide')
              } else if (product.stock < orderProduct.count) {
                throw new Error('Stocks insufisants')
              } else {
                product.stock = product.stock - orderProduct.count
                Product.updateOne({ _id: product._id }, product)
                  .then(
                    result => {
                      if (product.stock <= 0) {
                        const searchedProduct = {
                          objectID: product._id,
                          dispo: (product.stock > 0)
                        }
                        index.partialUpdateObject(searchedProduct)
                      }
                    }
                  )
                  .catch(
                    error => {
                      throw error
                    }
                  )
                resolve({})
              }
            })
          .catch(
            error => {
              reject(error)
            }
          )
      }
    )
  }
  const checkOrder = new Promise((resolve, reject) => checkOrderFunction(order, resolve, reject))

  checkOrder
    .then(
      result => {
        order.save()
          .then(() => res.status(201).json({ message: 'commande ajoutée', objectId: order._id }))
          .catch(
            error => {
              res.status(400).json({ message: error.message })
              console.log(error)
            }
          )
      }
    )
    .catch(
      error => {
        res.status(400).json({ message: error.message })
        console.log(error)
      }
    )
}

exports.getOneOrder = (req, res, next) => {
  Order.findOne({ _id: req.params.id })
    .then(order => res.status(200).json(order))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.getAllOrder = (req, res, next) => {
  Order.find()
    .then(orders => res.status(200).json(orders))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.modifyOrder = (req, res, next) => {
  const id = req.params.id
  const order = new Order({ ...req.body.order })
  order._id = id
  Order.updateOne({ _id: id }, order)
    .then(() => res.status(201).json({ message: 'commande mise à jour', objectId: id }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.deleteOrder = (req, res, next) => {
  Order.deleteOne({ _id: req.params.id })
    .then(() => res.status(201).json({ message: 'commande supprimée' }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}
