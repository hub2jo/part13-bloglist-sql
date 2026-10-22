const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Session, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: ['token missing'] })
  }

  const token = authorization.substring(7)

  try {
    req.decodedToken = jwt.verify(token, SECRET)
  } catch {
    return res.status(401).json({ error: ['token invalid'] })
  }

  const session = await Session.findOne({
    where: { token },
    include: { model: User }
  })

  if (!session) {
    return res.status(401).json({ error: ['session expired, please log in again'] })
  }

  if (session.user.disabled) {
    return res.status(401).json({ error: ['account disabled, please contact admin'] })
  }

  req.token = token
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: [...new Set(error.errors.map(e => e.message))] })
  }
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: [error.message] })
  }

  next(error)
}

module.exports = { 
  tokenExtractor,
  unknownEndpoint, 
  errorHandler 
}