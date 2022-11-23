import { Router } from 'express'
import Article from '../models/Article'

const articlesRoutes = Router()

articlesRoutes.get('/:slug', (req, res) => {
  const slug = req.params.slug

  Article.findOne({ where: { slug } })
    .then((article) => {
      if (article == undefined) {
        res.redirect('/')
      } else {
        res.render('pages/article', { article })
      }
    })
    .catch((error) => res.redirect('/'))
})

export default articlesRoutes
