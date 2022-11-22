import { Router } from 'express'

const categoriesRoutes = Router()

categoriesRoutes.get('/', (req, res) => {
  res.send('ROTA DE CATEGORIAS')
})

export default categoriesRoutes
