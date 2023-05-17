const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).json({ message: 'Access denied. auth' })

  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded
    console.log(req.user)
    next();
  } catch (err) {
    res.status(400).json({ message: 'Please, sign in again' })
  }
}