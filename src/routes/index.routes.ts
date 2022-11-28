import { Router } from 'express'
import Article from '../models/Article'
import Category from '../models/Category'
import adminRoutes from './admin/index.routes'
import articlesRoutes from './articles.routes'
import categoriesRoutes from './categories.routes'

const routes = Router()

routes.get('/', (req, res) => {
  Article.findAndCountAll({
    order: [['id', 'desc']],
    limit: 4,
    offset: 0,
  }).then((articles) => {
    let maxPages = articles.count / 4
    if (articles.count % 4 != 0) maxPages++

    const result = {
      page: 1,
      maxPages,
      next: true,
      articles,
    }
    Category.findAll().then((categories) => {
      res.render('pages/home', { categories, result })
    })
  })
})

routes.use('/categories', categoriesRoutes)
routes.use('/articles', articlesRoutes)
routes.use('/admin', adminRoutes)

export default routes
