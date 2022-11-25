import { Router } from 'express'
import Article from '../models/Article'
import Category from '../models/Category'
import adminRoutes from './admin/index.routes'
import articlesRoutes from './articles.routes'
import categoriesRoutes from './categories.routes'

const routes = Router()

routes.get('/', (req, res) => {
  Article.findAll({ order: [['id', 'desc']] }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render('pages/home', { articles, categories })
    })
  })
})

routes.use('/categories', categoriesRoutes)
routes.use('/articles', articlesRoutes)
routes.use('/admin', adminRoutes)

export default routes
