const router = require('express').Router()
const { ReadingList, Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body

  if (!blogId || !userId) {
    return res.status(400).json({ error: ['blogId and userId are required'] })
  }

  const blog = await Blog.findByPk(blogId)
  if (!blog) {
    return res.status(404).json({ error: ['blog not found'] })
  }

  const user = await User.findByPk(userId)
  if (!user) {
    return res.status(404).json({ error: ['user not found'] })
  }

  const entry = await ReadingList.create({ blogId, userId })
  res.json(entry)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const entry = await ReadingList.findByPk(req.params.id)
  if (!entry) {
    return res.status(404).json({ error: ['reading list entry not found'] })
  }

  if (entry.userId !== req.decodedToken.id) {
    return res.status(401).json({ error: ['you can only mark blogs in your own reading list'] })
  }

  entry.read = req.body.read
  await entry.save()
  res.json(entry)
})

module.exports = router