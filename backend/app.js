const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const xss = require('xss-clean')
const helmet = require('helmet')
const app = express()

const articleRoutes = require('./routes/article')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')
const clientRoutes = require('./routes/client')
const checkoutRoutes = require('./routes/checkout')
const webhookRoutes = require('./routes/webhook')

mongoose.connect('mongodb+srv://projet-simplon-api:t5b5QH4S5gvUTvc@projet-simplon.0n4ye.mongodb.net/projet-simplon?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/article', bodyParser.json(), articleRoutes)
app.use('/category', bodyParser.json(), categoryRoutes)
app.use('/product', bodyParser.json(), productRoutes)
app.use('/order', bodyParser.json(), orderRoutes)
app.use('/auth', bodyParser.json(), authRoutes)
app.use('/admin', bodyParser.json(), adminRoutes)
app.use('/client', bodyParser.json(), clientRoutes)
app.use('/checkout', bodyParser.json(), checkoutRoutes)
app.use('/webhook', bodyParser.raw({ type: 'application/json' }), webhookRoutes)

module.exports = app
