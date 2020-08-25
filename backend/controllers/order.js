const Order = require('../models/order')
const Product = require('../models/product')

const algoliasearch = require('algoliasearch')
const client = algoliasearch('H2YGA5NBNG', '26c633cd2792a5a165314b26bebf1e60')
const index = client.initIndex('dev_projetFinal')

const stripe = require('stripe')('sk_test_51HIvljFICXrfazILw3pszg0X1jvbAXbqm5mymyjUChcoMOCpye2e4DBJSGjugafDTzRrOFDCa3YrEvrAghmNrqFD00tiYxBtIM')

exports.createOrder = (req, res, next) => {
  var _order = req.body.order
  if (res.locals.order) _order = res.locals.order
  const order = new Order({ ..._order })
  console.log(_order)
  console.log(order)

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
        console.log('ok')
        order.save()
          .then(() => {
            res.status(201).json({ message: 'commande ajoutée', objectId: order._id })
            console.log('saved')
          })
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

exports.createCheckoutSession = (req, res) => {
  const items = req.body.items
  var requests = []
  items.forEach(
    item => {
      requests.push(
        Product.findById(item.sku)
          .then(product => {
            return { ...product._doc, ...item }
          })
      )
    }
  )
  Promise.all(requests)
    .then(products => {
      var lineItems = []
      products.forEach(product => {
        var price = product.price
        if (product.sale !== 0) {
          price = product.price - (product.price * product.sale / 100)
        }
        lineItems.push(
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: product.name
              },
              unit_amount: Math.floor(price * 100)
            },
            quantity: product.quantity
          }
        )
      })
      return lineItems
    })
    .then(lineItems => {
      const sessionContent = {
        payment_method_types: ['card', 'bancontact', 'eps', 'giropay', 'ideal', 'p24'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://slicedice.ddns.net:3000/success/',
        cancel_url: 'https://slicedice.ddns.net:3000/cancel/',
        shipping_address_collection: {
          allowed_countries: ['FR', 'BE', 'GE', 'ES']
        },
        locale: 'fr',
        payment_intent_data: {
          metadata: {
            products: JSON.stringify(items)
          }
        }
      }
      stripe.checkout.sessions.create(sessionContent)
        .then(session => {
          res.status(200).json({ id: session.id })
        })
        .catch(error => {
          res.status(400).json({ error: error })
          console.log(error)
        })
    })
    .catch(error => {
      res.status(400).json({ error: error })
      console.log(error)
    })
}

exports.handleWebhook = (req, res, next) => {
  console.log(req.body)
  const endpointSecret = 'whsec_ybFhGOpOKmqr188ioKr9siIE3pPtG3fK'
  const sig = req.headers['stripe-signature']

  var event
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)
    console.log(err)
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      var paymentIntent = event.data.object
      // eslint-disable-next-line
      var { line1, line2, postal_code, city, country } = paymentIntent.shipping.address
      if (line2 === null) line2 = ''
      var products = []
      JSON.parse(paymentIntent.metadata.products).forEach(
        product => {
          products.push({ product_id: product.sku, count: product.quantity })
        }
      )
      var order =
        {
          client_email: paymentIntent.charges.data[0].billing_details.email,
          // eslint-disable-next-line
          delivery_address: paymentIntent.shipping.name + ', \n' + line1 + ' \n' + line2 + ' \n' + postal_code + ' ' + city + ', ' + country,
          products: products,
          price: paymentIntent.amount / 100,
          billId: paymentIntent.id,
          validated: false,
          delivered: false
        }
      res.locals = { order: order }
      next()
      break
    // ... handle other event types
    default:
      // Unexpected event type
      console.log('unhandled event: ' + event.type)
      return res.status(400).end()
  }
}
