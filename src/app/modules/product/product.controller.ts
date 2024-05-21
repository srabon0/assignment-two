import { Request, Response } from 'express'
import { ProductService } from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const result = await ProductService.createProduct(product)
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
      message: 'Student fetched successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error in getSingleStudent',
    })
  }
}

export const ProductControllers = {
  createProduct,
  getProducts,
  fetchProductById,
}
