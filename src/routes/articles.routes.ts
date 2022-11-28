import { Router } from 'express'
import Article from '../models/Article'
import Category from '../models/Category'

const articlesRoutes = Router()

articlesRoutes.get('/:slug', (req, res) => {
  const slug = req.params.slug

  Article.findOne({ where: { slug } })
    .then((article) => {
      if (article == undefined) {
        res.redirect('/')
      } else {
        Category.findAll().then((categories) => {
          res.render('pages/article', { article, categories })
        })
      }
    })
    .catch((error) => res.redirect('/'))
})

articlesRoutes.get('/page/:page', (req, res) => {
  const page = req.params.page
  let offset: number
  let next = false

  if (isNaN(+page) || +page == 1) {
    offset = 0
  } else offset = (+page - 1) * 4

  Article.findAndCountAll({ order: [['id', 'desc']], limit: 4, offset }).then(
    (articles) => {
      if (offset + 4 < articles.count) next = true

      let maxPages = articles.count / 4
      if (articles.count % 4 != 0) maxPages++

      const result = {
        page: +page,
        maxPages,
        next,
        articles,
      }

      Category.findAll().then((categories) => {
        res.render('pages/article/page', { result, categories })
      })
    }
  )
})

export default articlesRoutes
