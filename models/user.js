const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: {
      msg: 'Username must be unique'
    },
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Username must be a valid email address'
      },
      notEmpty: {
        msg: 'Username cannot be empty'
      },
      notNull: {
        msg: 'Username is required'
      }
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name is required'
      },
      notEmpty: {
        msg: 'Name cannot be empty'
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'user'
})

module.exports = User