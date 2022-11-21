import { Router } from 'express'
import adminRoutes from './admin.routes'
import articlesRouters from './articles.routes'
import categoriesRouters from './categories.routes'

const routes = Router()

routes.get('/', (req, res) => {
  res.render('pages/home')
})

routes.use('/categories', categoriesRouters)
routes.use('/articles', articlesRouters)
routes.use('/admin', adminRoutes)

export default routes
