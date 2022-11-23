import { Router } from 'express'
import slugify from 'slugify'
import Article from '../../models/Article'
import Category from '../../models/Category'

const articlesRoutes = Router()

articlesRoutes.get('/', (req, res) => {
  Article.findAll({
    include: [{ model: Category }],
  }).then((articles) => {
    res.render('pages/admin/articles/index', { articles })
  })
})

articlesRoutes.get('/new', (req, res) => {
  Category.findAll().then((categories) => {
    res.render('pages/admin/articles/new', { categories })
  })
})

articlesRoutes.post('/create', (req, res) => {
  const title = req.body.title
  const slug = slugify(title)
  const body = req.body.articleBody
  const categoryId = req.body.category

  if (title == undefined || title == '' || body == undefined || body == '') {
    res.redirect('/admin/articles/new')
  } else if (isNaN(categoryId)) {
    res.redirect('/admin/articles/new')
  } else {
    Article.create({
      title,
      slug,
      body,
      categoryId,
    }).then(() => res.redirect('/admin/articles'))
  }
})

articlesRoutes.post('/delete', (req, res) => {
  const id = req.body.id

  if (id != undefined) {
    if (!isNaN(id)) {
      Article.destroy({
        where: {
          id,
        },
      }).then(() => res.redirect('/admin/articles'))
    } else res.redirect('/admin/articles')
  } else res.redirect('/admin/articles')
})

export default articlesRoutes
