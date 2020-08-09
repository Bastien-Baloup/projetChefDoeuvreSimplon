const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Client = require('../models/client')

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

exports.getOneClient = (req, res, next) => {
  Client.findOne({ _id: req.params.id })
    .then(
      client => {
        delete client.password
        res.status(200).json(client)
      }
    )
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.getAllClient = (req, res, next) => {
  Client.find()
    .then(
      clients => {
        clients.map(client => delete client.password)
        res.status(200).json(clients)
      }
    )
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.modifyClient = (req, res, next) => {
  const _client = req.body.client
  bcrypt.hash(_client.password, 10)
    .then(
      hash => {
        delete _client.password
        const client = new Client({ ..._client, password: hash })
        Client.updateOne({ _id: req.params.id }, client)
          .then(() => res.status(201).json({ message: 'client modifié', objectId: client._id }))
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

exports.deleteClient = (req, res, next) => {
  Client.deleteOne({ _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Client supprime' }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}
