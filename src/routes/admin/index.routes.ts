import { Router } from 'express'
import adminAuth from '../../middlewares/adminAuth'
import articlesRoutes from './adminArticles.routes'
import categoriesRoutes from './adminCategories.routes'
import userRoutes from './user.routes'

const adminRoutes = Router()

adminRoutes.use('/categories', adminAuth, categoriesRoutes)
adminRoutes.use('/articles', adminAuth, articlesRoutes)
adminRoutes.use('/users', adminAuth, userRoutes)

export default adminRoutes
