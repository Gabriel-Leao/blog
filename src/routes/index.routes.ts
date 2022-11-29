import { Router } from 'express'
import Article from '../models/Article'
import Category from '../models/Category'
import User from '../models/User'
import adminRoutes from './admin/index.routes'
import articlesRoutes from './articles.routes'
import categoriesRoutes from './categories.routes'
import bcrypt from 'bcryptjs'
import adminAuth from '../middlewares/adminAuth'

const routes = Router()

routes.get('/', (req, res) => {
  Article.findAndCountAll({
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
})

routes.get('/login', (req, res) => {
  res.render('pages/admin/users/login')
})

routes.post('/authenticate', (req, res) => {
  const email = req.body.userEmail
  const password = req.body.userPassword

  User.findOne({ where: { email } }).then((user: any) => {
    if (user == undefined) {
      res.redirect('/login')
    } else {
      const correct = bcrypt.compareSync(password, user.password)
      if (correct) {
        req.session.user = {
          id: user.id,
          email: user.email,
        }
        res.redirect('/admin/articles')
      } else {
        res.redirect('/login')
      }
    }
  })
})

routes.get('/logout', (req, res) => {
  req.session.user == undefined
  res.redirect('/')
})

routes.use('/categories', categoriesRoutes)
routes.use('/articles', articlesRoutes)
routes.use('/admin', adminAuth, adminRoutes)

export default routes
