import { STRING, TEXT } from 'sequelize'
import database from '../config/db.config'

const Article = database.define('articles', {
  title: {
    type: STRING,
    allowNull: false,
  },
  slug: {
    type: STRING,
    allowNull: false,
  },
  body: {
    type: TEXT,
    allowNull: false,
  },
})

export default Article
