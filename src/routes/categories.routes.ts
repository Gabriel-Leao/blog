import { Router } from 'express'

const categoriesRouters = Router()

categoriesRouters.get('/', (req, res) => {
  res.send('ROTA DE CATEGORIAS')
})

export default categoriesRouters
