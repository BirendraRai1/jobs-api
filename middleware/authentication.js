const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError(`Authentication invalid`)
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // const user = await User.findById(payload.userId).select('-password')
    // req.user = user
    const { userId, name } = payload
    //attach the user to the job routes
    req.user = { userId, name }
    next()
  } catch (error) {
    console.log(`error inside the middleware ${error}`)
    throw new UnauthenticatedError(`Authentication invalid`)
  }
}

module.exports = auth
