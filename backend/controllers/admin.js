const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config('.env')

const Admin = require('../models/admins')

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
              res.status(200).json({ token: jwt.sign({ adminId: admin._id }, process.env.ADMIN_KEY, { expiresIn: '2h' }) })
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
        admin.password = ''
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
        admins.map(admin => (admin.password = ''))
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
  var id = req.params.id
  const _admin = req.body.admin
  _admin._id = id
  if (_admin.password) {
    id = req.body.adminId
    bcrypt.hash(_admin.password, 10)
      .then(
        hash => {
          _admin.password = hash
          Admin.updateOne({ _id: id }, { ..._admin })
            .then(() => res.status(201).json({ message: 'admin modifié', objectId: id }))
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
  } else {
    Admin.updateOne({ _id: id }, _admin)
      .then(() => res.status(201).json({ message: 'admin modifié', objectId: id }))
      .catch(
        error => {
          res.status(400).json({ error: error })
          console.log(error)
        }
      )
  }
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
