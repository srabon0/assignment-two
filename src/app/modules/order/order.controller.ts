import { Request, Response } from 'express'
import { OrderService } from './order.service'
import joiOrderSchema from './order.validate'

const createOrder = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const { error, value } = joiOrderSchema.validate(product)
    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        message: error.message,
      })
    }

    const result = await OrderService.createOrder(value)
    res.status(200).json({
      success: true,
      data: result,
      message: 'Order placed successfully',
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error in placing an order',
      })
    }
  }
}

const getOrders = async (req: Request, res: Response) => {
  try {
    if (req.query.email) {
      const ordereremail = req.query.email
      const result = await OrderService.getAllOrders(ordereremail)
      if (result.length === 0) {
        throw new Error('Order not found')
      }
      return res.status(200).json({
        success: true,
        data: result,
        message: 'All order fetched successfully',
      })
    }
    const result = await OrderService.getAllOrders()
    res.status(200).json({
      success: true,
      data: result,
      message: 'All order fetched successfully',
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Error in getting all the orders',
      })
    }
  }
}

export const OrderController = {
  createOrder,
  getOrders,
}
