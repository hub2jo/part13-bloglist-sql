const { sequelize } = require('./util/db')
const { Blog } = require('./models')

const main = async () => {
  try {
    const blogs = await Blog.findAll()
    blogs.forEach(blog => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    })
  } catch (error) {
    console.error('Unable to read blogs:', error)
  } finally {
    await sequelize.close()
  }
}

main()