import { Router } from 'express'
import User from '../../models/User'
import bcrypt from 'bcryptjs'

const userRoutes = Router()

userRoutes.get('/', (req, res) => {
  User.findAll().then((users) => {
    res.render('pages/admin/users/index', { users })
  })
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

userRoutes.get('/edit/:id', (req, res) => {
  const id = req.params.id

  if (isNaN(+id)) {
    res.redirect('/admin/users/')
  } else {
    User.findByPk(id).then((user) => {
      res.render('pages/admin/users/edit', { user })
    })
  }
})

interface user {
  id: number
  email: string
  password: string
}

userRoutes.post('/update', (req, res) => {
  const id = req.body.id
  const password = req.body.userPassword
  const email = req.body.userEmail

  if (email == '') {
    res.redirect(`/admin/users/edit/${id}`)
  } else {
    User.findByPk(id).then((user: any) => {
      if (user.email == email) {
        if (password == '') {
          res.redirect(`/admin/users/edit/${id}`)
        } else {
          try {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            User.update({ password: hash }, { where: { id } }).then(() => {
              res.redirect('/admin/users')
            })
          } catch (error) {
            res.redirect(`/admin/users/edit/${id}`)
          }
        }
      } else {
        User.findOne({ where: { email } }).then((user) => {
          if (user == undefined) {
            if (password == '') {
              try {
                User.update({ email }, { where: { id } }).then(() => {
                  res.redirect('/admin/users')
                })
              } catch (error) {
                res.redirect(`/admin/users/edit/${id}`)
              }
            } else {
              try {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                User.update({ email, password: hash }, { where: { id } }).then(
                  () => {
                    res.redirect('/admin/users')
                  }
                )
              } catch (error) {
                res.redirect(`/admin/users/edit/${id}`)
              }
            }
          } else res.redirect(`/admin/users/edit/${id}`)
        })
      }
    })
  }
})

userRoutes.post('/delete', (req, res) => {
  const id = req.body.id

  if (id == undefined) {
    res.redirect('/admin/users')
  } else if (isNaN(+id)) {
    res.redirect('/admin/users')
  } else {
    try {
      User.destroy({ where: { id } }).then(() => res.redirect('/admin/users'))
    } catch (error) {
      res.redirect('/admin/users')
    }
  }
})

export default userRoutes
