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
        Article.findAndCountAll({
          where: { categoryId: category.id },
          order: [['id', 'desc']],
          limit: 4,
          offset: 0,
        }).then((articles) => {
          let maxPages = articles.count / 4
          if (articles.count % 4 != 0) maxPages++

          const result = {
            page: 1,
            maxPages,
            next: true,
            articles,
          }

          Category.findAll().then((categories) => {
            res.render('pages/home', { categories, result })
          })
        })
      }
    })
    .catch((error) => res.redirect('/'))
})

export default categoriesRoutes
