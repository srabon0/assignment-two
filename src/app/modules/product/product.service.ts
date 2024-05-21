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

const getAllProducts = async (searchTerm?: unknown) => {
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

const getProductById = async (productId: string): Promise<IProduct> => {
  try {
    const result = await Product.findById(productId)
    if (result) {
      return result as IProduct
    } else {
      throw new Error('Product not found')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const updateProduct = async (productId: string, product: IProduct) => {
  try {
    const result = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    })
    return result
  } catch (error) {
    return error
  }
}

const deleteProduct = async (productId: string) => {
  try {
    const result = await Product.findByIdAndDelete(productId)
    return result
  } catch (error) {
    return error
  }
}

const updateProductAfterPlacedOrder = async (
  productId: string,
  quantity: number,
) => {
  try {
    const product = await Product.findById(productId)
    if (product) {
      const updatedQuantity = product.inventory.quantity - quantity
      const result = await Product.findByIdAndUpdate(
        productId,
        {
          inventory: {
            quantity: updatedQuantity,
            inStock: updatedQuantity > 0,
          },
        },
        { new: true },
      )
      return result
    }
  } catch (error) {
    return error
  }
}

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductAfterPlacedOrder,
}
