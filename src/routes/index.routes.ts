import { Router } from 'express'
import articlesRouters from './articles.routes'
import categoriesRouters from './categories.routes'

const routes = Router()

routes.get('/', (req, res) => {
  res.render('pages/home')
})

routes.use('/categories', categoriesRouters)
routes.use('/articles', articlesRouters)

export default routes
