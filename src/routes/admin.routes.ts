import { Router } from 'express'
import slugify from 'slugify'
import Category from '../models/Category'

const adminRoutes = Router()

adminRoutes.get('/categories/new', (req, res) => {
  res.render('pages/admin/categories/new')
})

adminRoutes.post('/categories/create', (req, res) => {
  const title = req.body.title

  if (title == undefined || title == '') {
    res.redirect('/admin/categories/new')
  } else {
    Category.create({
      title,
      slug: slugify(title),
    }).then(() => res.redirect('/admin/categories'))
  }
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

adminRoutes.get('/categories/edit/:id', (req, res) => {
  const id = req.params.id

  if (isNaN(+id)) {
    res.redirect('/admin/categories')
  } else {
    Category.findByPk(id)
      .then((category) => {
        if (category != undefined) {
          res.render('pages/admin/categories/edit', { category })
        } else res.redirect('/admin/categories')
      })
      .catch((error) => {
        res.redirect('/admin/categories')
      })
  }
})

adminRoutes.post('/categories/update', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const slug = slugify(title)

  Category.update(
    { title, slug },
    {
      where: {
        id,
      },
    }
  ).then(() => res.redirect('/admin/categories'))
})

export default adminRoutes
