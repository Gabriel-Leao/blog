import { Router } from 'express'
import slugify from 'slugify'
import Category from '../models/Category'

const adminRoutes = Router()

adminRoutes.get('/categories/new', (req, res) => {
  res.render('pages/admin/categories/new')
})

adminRoutes.post('/categories/create', (req, res) => {
  const title = req.body.title

  if (title != undefined) {
    Category.create({
      title,
      slug: slugify(title),
    }).then(() => res.redirect('/'))
  } else res.redirect('pages/admin/categories/new')
})

adminRoutes.get('/categories', (req, res) => {
  Category.findAll().then((categories) => {
    res.render('pages/admin/categories/index', { categories })
  })
})

adminRoutes.post('/categories/delete', (req, res) => {
  const id = req.body.id

  if (id != undefined) {
    if (!isNaN(id)) {
      Category.destroy({
        where: {
          id,
        },
      }).then(() => res.redirect('/admin/categories'))
    } else res.redirect('/admin/categories')
  } else res.redirect('/admin/categories')
})

export default adminRoutes
