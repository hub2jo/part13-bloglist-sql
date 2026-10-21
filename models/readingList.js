const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingList extends Model {}

ReadingList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    unique: {
      name: 'reading_lists_user_id_blog_id_unique',
      msg: 'blog is already in the reading list'
    }
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
    unique: {
      name: 'reading_lists_user_id_blog_id_unique',
      msg: 'blog is already in the reading list'
    }
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notNull: { msg: 'read must be true or false' }
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readingList'
})

module.exports = ReadingList