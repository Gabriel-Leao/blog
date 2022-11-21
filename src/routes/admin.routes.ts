import { Router } from 'express'

const adminRoutes = Router()

adminRoutes.get('/categories/new', (req, res) => {
  res.render('pages/admin/categories/new')
})

export default adminRoutes
