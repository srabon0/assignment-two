import IProduct from './product.interface'
import Product from './product.model'

const createProduct = async (product: IProduct) => {
  try {
    const result = await Product.create(product)
    return result
  } catch (error) {
    return error
  }
}

const getAllProducts = async (searchTerm?: string) => {
  try {
    if (searchTerm) {
      const result = await Product.aggregate([
        {
          $match: {
            $or: [
              { name: { $regex: searchTerm, $options: 'i' } },
              { description: { $regex: searchTerm, $options: 'i' } },
              { price: { $regex: searchTerm, $options: 'i' } },
              { category: { $regex: searchTerm, $options: 'i' } },
            ],
          },
        },
      ])
      return result
    }
    const result = await Product.find({})
    return result
  } catch (error) {
    return error
  }
}

const getProductById = async (studentId: string) => {
  try {
    const result = await Product.findById(studentId)
    return result
  } catch (error) {
    return error
  }
}

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
}
