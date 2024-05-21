import { Schema, model } from 'mongoose'
import IOrder from './order.interface'

const orderSchema: Schema = new Schema<IOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const OrderModel = model<IOrder>('Order', orderSchema)

export default OrderModel
