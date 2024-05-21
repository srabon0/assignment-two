import cors from 'cors'
import express, { Application, Request, Response } from 'express'

import { OrderRoutes } from './app/modules/order/order.route'
import { ProductRoutes } from './app/modules/product/product.route'
const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//application routes

//product route
app.use('/api/products', ProductRoutes)

// orders route

app.use('/api/orders', OrderRoutes)
//default route
app.get('/', (req: Request, res: Response) => {
  const a = 1
  res.send('Welcome to the assignment 2 ' + a)
})

app.route('*').all((req: Request, res: Response) => {
  res.status(404).send('Route not found')
})

export default app
