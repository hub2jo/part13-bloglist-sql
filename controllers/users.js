const router = require('express').Router()
const { User } = require('../models')

router.post('/', async (req, res) => {
  const { username, name } = req.body
  const user = await User.create({ username, name })
  res.json(user)
})

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (!user) {
    return res.status(404).end()
  }
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (!user) {
    return res.status(404).end()
  }
  if (req.body.username !== undefined) {
    user.username = req.body.username
  }
  if (req.body.name !== undefined) {
    user.name = req.body.name
  }
  await user.save()
  res.json(user)
})

module.exports = router
