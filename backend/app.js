const express = require('express')

const app = express()

app.use(
  (req, res) => {
    res.status(200)
    res.json({ message: 'votre requète à bien été reçue !' })
  }
)

module.exports = app
