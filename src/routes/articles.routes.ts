import { Router } from 'express'

const articlesRouters = Router()

articlesRouters.get('/', (req, res) => {
  res.send('ROTA DE ARTIGOS')
})

export default articlesRouters
