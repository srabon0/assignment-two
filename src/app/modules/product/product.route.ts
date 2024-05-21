import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router()

router.post('/', ProductControllers.createProduct)

router.get('/', ProductControllers.getProducts)

router.get('/:productId', ProductControllers.fetchProductById)

router.get('/search', ProductControllers.fetchSearchProducts)

export const ProductRoutes = router
