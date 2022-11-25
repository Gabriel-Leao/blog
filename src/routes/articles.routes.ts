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

export default articlesRoutes
