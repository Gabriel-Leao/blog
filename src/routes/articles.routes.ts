import { Router } from 'express'

const articlesRoutes = Router()

articlesRoutes.get('/', (req, res) => {
  res.send('ROTA DE ARTIGOS')
})

export default articlesRoutes
