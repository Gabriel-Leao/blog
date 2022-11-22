import { Router } from 'express'

const articlesRoutes = Router()

articlesRoutes.get('/new', (req, res) => {
  res.render('pages/admin/articles/new')
})

export default articlesRoutes
