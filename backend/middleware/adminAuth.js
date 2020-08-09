const jwt = require('jsonwebtoken')

const notSoSecretKey = 'YQRFPAwNVjVT7SczqkoTXWSDJKsnd1JtLpU29VSGpmEXAMuKyNbxFIu7rMTTzL6ARH0OaHKM8yJ5T86jDINapBMv8S9JZTmi9kQlwwO2jCfJIzlv3wvDtLYbWIGQIgql9qZR9QNNgUdPqoAClWgx35QEnPirE8PSP7xBLiGkUFdENGXH4GAk1dQzpHU4FcHYkT0jHjh9VpA6siomnK8R3KjOqEhznLQXArdZuv6in45xcqtD7QvejgYu4aMo7l8k'

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, notSoSecretKey)
    const adminId = decodedToken.adminId
    if (req.body.adminId && req.body.adminId !== adminId) {
      throw new Error('Invalid admin ID')
    } else {
      next()
    }
  } catch {
    const error = new Error('Invalid request!')
    res.status(401).json({ error: error })
    console.log(error)
  }
}
