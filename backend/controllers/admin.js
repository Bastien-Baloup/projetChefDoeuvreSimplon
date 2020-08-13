const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Admin = require('../models/admins')

const notSoSecretKey = 'YQRFPAwNVjVT7SczqkoTXWSDJKsnd1JtLpU29VSGpmEXAMuKyNbxFIu7rMTTzL6ARH0OaHKM8yJ5T86jDINapBMv8S9JZTmi9kQlwwO2jCfJIzlv3wvDtLYbWIGQIgql9qZR9QNNgUdPqoAClWgx35QEnPirE8PSP7xBLiGkUFdENGXH4GAk1dQzpHU4FcHYkT0jHjh9VpA6siomnK8R3KjOqEhznLQXArdZuv6in45xcqtD7QvejgYu4aMo7l8k'

exports.signup = (req, res, next) => {
  const _admin = req.body.admin
  bcrypt.hash(_admin.password, 10)
    .then(
      hash => {
        delete _admin.password
        const admin = new Admin({ ..._admin, password: hash })
        admin.save()
          .then(() => res.status(201).json({ message: 'Admin créé', objectId: admin._id }))
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
  Admin.findOne({ login: credentials.login })
    .then(
      admin => {
        if (!admin) {
          return res.status(401).json({ error: 'Login inconnu' })
        }
        bcrypt.compare(credentials.password, admin.password)
          .then(
            valid => {
              if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect' })
              }
              res.status(200).json({ token: jwt.sign({ adminId: admin._id }, notSoSecretKey, { expiresIn: '4h' }) })
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

exports.getOneAdmin = (req, res, next) => {
  Admin.findOne({ _id: req.params.id })
    .then(
      admin => {
        delete admin.password
        res.status(200).json(admin)
      }
    )
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.getAllAdmin = (req, res, next) => {
  Admin.find()
    .then(
      admins => {
        admins.map(admin => delete admin.password)
        res.status(200).json(admins)
      }
    )
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}

exports.modifyAdmin = (req, res, next) => {
  const _admin = req.body.admin
  bcrypt.hash(_admin.password, 10)
    .then(
      hash => {
        _admin.password = hash
        const admin = new Admin({ ..._admin })
        Admin.updateOne({ _id: req.params.id }, admin)
          .then(() => res.status(201).json({ message: 'admin modifié', objectId: admin._id }))
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

exports.deleteAdmin = (req, res, next) => {
  Admin.deleteOne({ _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Admin supprime' }))
    .catch(
      error => {
        res.status(400).json({ error: error })
        console.log(error)
      }
    )
}
