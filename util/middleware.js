const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  }
    if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = { unknownEndpoint, errorHandler }