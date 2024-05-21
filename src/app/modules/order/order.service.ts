import IProduct from '../product/product.interface'
import { ProductService } from '../product/product.service'
import IOrder from './order.interface'
import Order from './order.model'

const createOrder = async (order: IOrder): Promise<IOrder> => {
  try {
    const productId = order.productId
    //if product exists in the database then create order else throw error
    const findProduct: IProduct = await ProductService.getProductById(productId)
    if (!findProduct) {
      throw new Error('Product does not exist')
    }

    if (order.quantity > findProduct.inventory.quantity) {
      throw new Error('Insufficient quantity available in inventory')
    }

    const result = await Order.create(order)
    await ProductService.updateProductAfterPlacedOrder(
      productId,
      order.quantity,
    )
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw error // rethrow the original error
    } else {
      throw error
    }
  }
}

const getAllOrders = async (email?: unknown) => {
  try {
    if (email) {
      const result = await Order.find({ email: email })
      return result
    }
    const result = await Order.find({})
    return result
  } catch (error) {
    return error
  }
}

export const OrderService = {
  createOrder,
  getAllOrders,
}
