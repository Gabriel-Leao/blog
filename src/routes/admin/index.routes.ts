import { Router } from 'express'
import articlesRoutes from './adminArticles.routes'
import categoriesRoutes from './adminCategories.routes'

const adminRoutes = Router()

adminRoutes.use('/categories', categoriesRoutes)
adminRoutes.use('/articles', articlesRoutes)

export default adminRoutes
