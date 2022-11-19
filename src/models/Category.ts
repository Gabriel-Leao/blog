import { STRING } from 'sequelize'
import database from '../config/db.config'

const Category = database.define('categories', {
  title: {
    type: STRING,
    allowNull: false,
  },
  slug: {
    type: STRING,
    allowNull: false,
  },
})

export default Category
