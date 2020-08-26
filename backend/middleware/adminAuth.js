const jwt = require('jsonwebtoken')
require('dotenv').config('.env')

module.exports = (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(' ')[1]
    const token = req.headers.authorization

    const decodedToken = jwt.verify(token, process.env.ADMIN_KEY)
    const adminId = decodedToken.adminId
    if (req.body.adminId && req.body.adminId !== adminId) {
      throw new Error('Invalid admin ID')
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({ message: 'Vous êtes déconnecté' })
    console.log(error)
  }
}
