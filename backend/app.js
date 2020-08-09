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
const articleRoutes = require('./routes/articles')
const adminRoutes = require('./routes/articles')
const clientRoutes = require('./routes/client')

app.use(cors())
app.use(bodyParser.json())

app.use('/get', getRoutes)
app.use('/article', articleRoutes)
app.use('/auth/admin', adminRoutes)
app.use('/auth/client', clientRoutes)

module.exports = app
