import { Router } from 'express'
import Article from '../models/Article'
import adminRoutes from './admin/index.routes'
import articlesRoutes from './articles.routes'
import categoriesRoutes from './categories.routes'

const routes = Router()

routes.get('/', (req, res) => {
  Article.findAll().then((articles) => {
    res.render('pages/home', { articles })
  })
})

routes.use('/categories', categoriesRoutes)
routes.use('/articles', articlesRoutes)
routes.use('/admin', adminRoutes)

export default routes
