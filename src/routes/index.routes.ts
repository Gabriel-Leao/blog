import { Router } from 'express'
import adminRoutes from './admin/index.routes'
import articlesRoutes from './articles.routes'
import categoriesRoutes from './categories.routes'

const routes = Router()

routes.get('/', (req, res) => {
  res.render('pages/home')
})

routes.use('/categories', categoriesRoutes)
routes.use('/articles', articlesRoutes)
routes.use('/admin', adminRoutes)

export default routes
