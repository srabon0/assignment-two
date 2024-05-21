import { Request, Response } from 'express'
import { ProductService } from './product.service'
import joiProductSchema from './product.validate'

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const { error, value } = joiProductSchema.validate(product)
    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        message: error.message,
      })
    }

    const result = await ProductService.createProduct(value)
    res.status(200).json({
      success: true,
      data: result,
      message: 'Product created successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error in create product',
    })
  }
}

const getProducts = async (req: Request, res: Response) => {
  try {
    if (req.query.searchTerm) {
      const searchTerm = req.query.searchTerm
      const result = await ProductService.getAllProducts(searchTerm)
      return res.status(200).json({
        success: true,
        data: result,
        message: 'All product fetched successfully',
      })
    }
    const result = await ProductService.getAllProducts()
    res.status(200).json({
      success: true,
      data: result,
      message: 'All product fetched successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error in getting all the products',
    })
  }
}

const fetchProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const result = await ProductService.getProductById(productId)
    res.status(200).json({
      success: true,
      data: result,
      message: 'Product fetched successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error in Product fetching by id',
    })
  }
}

const updateProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const product = req.body
    const { error, value } = joiProductSchema.validate(product)
    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        message: error.message,
      })
    }
    const result = await ProductService.updateProduct(productId, value)
    res.status(200).json({
      success: true,
      data: result,
      message: 'Product updated successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error in updating product',
    })
  }
}

const deleteProductFromDatabase = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    await ProductService.deleteProduct(productId)
    res.status(200).json({
      success: true,
      data: null,
      message: 'Product deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error in deleting product',
    })
  }
}

export const ProductControllers = {
  createProduct,
  getProducts,
  fetchProductById,
  updateProductById,
  deleteProductFromDatabase,
}

// 664ccbfc5d5b8d017fd616bf

// {
//   "name": "One Plus 13 pro",
//   "description": "A sleek and powerful smartphone with cutting-edge features.",
//   "price": 999,
//   "category": "Electronics",
//   "tags": [
//       "smartphone",
//       "One Plus",
//       "Android"
//   ],
//   "variants": [
//       {
//           "type": "Color",
//           "value": "Mirror"
//       },
//       {
//           "type": "Storage Capacity",
//           "value": "256GB"
//       }
//   ],
//   "inventory": {
//       "quantity": 8,
//       "inStock": true
//   }
// }
