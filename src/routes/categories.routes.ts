import { Router } from 'express'
import Article from '../models/Article'
import Category from '../models/Category'

const categoriesRoutes = Router()

categoriesRoutes.get('/:slug', (req, res) => {
  const slug = req.params.slug
  Category.findOne({ where: { slug }, include: [{ model: Article }] })
    .then((category: any) => {
      if (category == undefined) {
        res.redirect('/')
      } else {
        Category.findAll().then((categories) => {
          res.render('pages/home', { articles: category.articles, categories })
        })
      }
    })
    .catch((error) => res.redirect('/'))
})

export default categoriesRoutes
