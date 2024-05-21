import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router()

router.post('/', ProductControllers.createProduct)

router.get('/', ProductControllers.getProducts)

router.get('/:productId', ProductControllers.fetchProductById)

router.put('/:productId', ProductControllers.updateProductById)

router.delete('/:productId', ProductControllers.deleteProductFromDatabase)

export const ProductRoutes = router
