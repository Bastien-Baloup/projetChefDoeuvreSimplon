const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Client = require('../models/clients')

const notSoSecretKey = 'clientKey'

exports.signup = (req, res, next) => {
  const _client = req.body.client
  bcrypt.hash(_client.password, 10)
    .then(
      hash => {
        delete _client.password
        const client = new Client({ ..._client, password: hash })
        client.save()
          .then(() => res.status(201).json({ message: 'client créé', objectId: client._id }))
          .catch(
            error => {
              res.status(400).json({ error: error })
              console.log(error)
            }
          )
      }
    )
    .catch(
      error => {
        res.status(500).json({ error: error })
        console.log(error)
      }
    )
}

exports.login = (req, res, next) => {
  const credentials = req.body.credentials
  Client.findOne({ email_address: credentials.email })
    .then(
      client => {
        if (!client) {
          return res.status(401).json({ error: 'Login inconnu' })
        }
        bcrypt.compare(credentials.password, client.password)
          .then(
            valid => {
              if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect' })
              }
              res.status(200).json({ token: jwt.sign({ clientId: client._id }, notSoSecretKey, { expiresIn: '4h' }) })
            }
          )
          .catch(
            error => {
              res.status(500).json({ error: error })
              console.log(error)
            }
          )
      }
    )
    .catch(
      error => {
        res.status(500).json({ error: error })
        console.log(error)
      }
    )
}
