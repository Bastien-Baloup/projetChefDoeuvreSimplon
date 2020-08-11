const jwt = require('jsonwebtoken')

const notSoSecretKey = 'clientKey'

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token, notSoSecretKey)
    const clientId = decodedToken.clientId
    if ((req.body.client._Id && req.body.client._Id !== clientId) || (req.params.id && req.params.id !== clientId)) {
      throw new Error('Invalid client ID')
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({ error: error })
    console.log(error)
  }
}
