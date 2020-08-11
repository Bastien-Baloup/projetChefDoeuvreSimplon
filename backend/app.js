const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

mongoose.connect('mongodb+srv://projet-simplon-api:t5b5QH4S5gvUTvc@projet-simplon.0n4ye.mongodb.net/projet-simplon?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const getRoutes = require('./routes/get')
const articleRoutes = require('./routes/article')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')
const clientRoutes = require('./routes/client')

app.use(cors())
app.use(bodyParser.json())

app.use('/get', getRoutes)
app.use('/article', articleRoutes)
app.use('/category', categoryRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/client', clientRoutes)

module.exports = app
