import { STRING } from 'sequelize'
import database from '../config/db.config'

const User = database.define('users', {
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
})

export default User
