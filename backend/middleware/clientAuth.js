const jwt = require('jsonwebtoken')

const notSoSecretKey = 'clientKey'

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, notSoSecretKey)
    const clientId = decodedToken.clientId
    if (req.body.clientId && req.body.clientId !== clientId) {
      throw new Error('Invalid client ID')
    } else {
      next()
    }
  } catch {
    const error = new Error('Invalid request!')
    res.status(401).json({ error: error })
    console.log(error)
  }
}
