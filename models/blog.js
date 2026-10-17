const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'URL is required'
      },
      isUrl: {
        msg: 'URL must be a valid URL'
      }
    }
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Title is required'
      },
      notEmpty: {
        msg: 'Title cannot be empty'
      }
    }
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: { args: [0], msg: 'Likes cannot be negative' },
      isInt: {
        msg: 'Likes must be an integer'
      },
      notNull: {
        msg: 'Likes is required'
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

module.exports = Blog