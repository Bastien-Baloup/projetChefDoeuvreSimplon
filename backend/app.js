const mongoose = require('mongoose')
const express = require('express')
const app = express()

mongoose.connect('mongodb+srv://projet-simplon-api:t5b5QH4S5gvUTvc@projet-simplon.0n4ye.mongodb.net/<dbname>?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const getRoutes = require('./routes/get')
const articleRoutes = require('./routes/articles')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use('/get', getRoutes)
app.use('/article', articleRoutes)

module.exports = app
