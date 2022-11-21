import { STRING, TEXT } from 'sequelize'
import database from '../config/db.config'
import Category from './Category'

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

Category.hasMany(Article)
Article.belongsTo(Category)

export default Article
