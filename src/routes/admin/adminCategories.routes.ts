import { Router } from 'express'
import slugify from 'slugify'
import Category from '../../models/Category'

const categoriesRoutes = Router()

categoriesRoutes.get('/new', (req, res) => {
  res.render('pages/admin/categories/new')
})

categoriesRoutes.post('/create', (req, res) => {
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

categoriesRoutes.get('/', (req, res) => {
  Category.findAll().then((categories) => {
    res.render('pages/admin/categories/index', { categories })
  })
})

categoriesRoutes.post('/delete', (req, res) => {
  const id = req.body.id

  if (id != undefined) {
    res.redirect('/admin/categories')
  } else if (isNaN(id)) {
    res.redirect('/admin/categories')
  } else {
    try {
      Category.destroy({
        where: {
          id,
        },
      }).then(() => res.redirect('/admin/categories'))
    } catch (error) {
      res.redirect('/admin/categories')
    }
  }
})

categoriesRoutes.get('/edit/:id', (req, res) => {
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

categoriesRoutes.post('/update', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const slug = slugify(title)

  if (title == '' || title == undefined) {
    res.redirect(`/admin/categories/edit/${id}`)
  } else {
    Category.update({ title, slug }, { where: { id } }).then(() =>
      res.redirect('/admin/categories')
    )
  }
})

export default categoriesRoutes
