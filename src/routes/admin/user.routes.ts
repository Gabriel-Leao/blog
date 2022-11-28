import { Router } from 'express'
import User from '../../models/User'
import bcrypt from 'bcryptjs'

const userRoutes = Router()

userRoutes.get('/', (req, res) => {
  res.render('pages/admin/users/index')
})

userRoutes.get('/new', (req, res) => {
  res.render('pages/admin/users/new')
})

userRoutes.post('/create', (req, res) => {
  const email = req.body.userEmail
  const password = req.body.userPassword

  if (email == '' || password == '') {
    res.redirect('/admin/users/new')
  } else {
    User.findOne({ where: { email } }).then((user) => {
      if (user == undefined) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        try {
          User.create({ email, password: hash }).then(() =>
            res.redirect('/admin/users')
          )
        } catch (error) {
          res.redirect('/admin/users/new')
        }
      } else {
        res.redirect('/admin/users/new')
      }
    })
  }
})

export default userRoutes
