import bodyParser from 'body-parser'
import express from 'express'
import routes from './routes/index.routes'
import database from './config/db.config'
import Article from './models/Article'
import Category from './models/Category'

const port = process.env.PORT || 3333
const app = express()

try {
  database
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

// try {
//   Article.sync({ force: false }).then(() =>
//     console.log('Table has been created successfully')
//   )
// } catch (error) {
//   console.error('Unable to create table Article:', error)
// }

// try {
//   Category.sync({ force: false }).then(() =>
//     console.log('Table has been created successfully')
//   )
// } catch (error) {
//   console.error('Unable to create table Category:', error)
// }

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)

app.listen(port, () => console.log('App listening'))
