import bodyParser from 'body-parser'
import express from 'express'
import routes from './routes/index.routes'
import database from './config/db.config'
import session from 'express-session'

const port = process.env.PORT || 3333
const app = express()

type User = {
  id: number
  email: string
}

// Augment express-session with a custom SessionData object
declare module 'express-session' {
  interface SessionData {
    user: User
  }
}

try {
  database
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

app.use(
  session({
    secret: process.env.SECRET || '',
    cookie: {},
    resave: true,
    saveUninitialized: true,
  })
)

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)

app.listen(port, () => console.log('App listening'))
