const Order = require('../models/order')
const Product = require('../models/product')

exports.createOrder = (req, res, next) => {
  const order = new Order({ ...req.body.order })

  order.products.map(
    productId => {
      Product.findOne({ _id: productId })
        .then(
          product => {
            if (!product) {
              throw new Error({ message: 'Produit invallide', objectId: productId })
            } else if (product.stock < 1) {
              throw new Error({ message: 'Produit indisponible', objectId: productId })
            }
          })
    })
    .then(
      order.save()
        .then(() => res.status(201).json({ message: 'commande ajoutée', objectId: order._id }))
        .catch(
          error => {
            res.status(400).json({ error: error })
            console.log(error)
          }
        )
    )
    .catch(
      error => {
        res.status(400).json({ error: error })
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
