import { Router } from 'express'
import articlesRoutes from './adminArticles.routes'
import categoriesRoutes from './adminCategories.routes'
import userRoutes from './user.routes'

const adminRoutes = Router()

adminRoutes.use('/categories', categoriesRoutes)
adminRoutes.use('/articles', articlesRoutes)
adminRoutes.use('/users', userRoutes)

export default adminRoutes
