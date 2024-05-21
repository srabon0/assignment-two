import { Schema, model } from 'mongoose'
import IProduct from './product.interface'

const productSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: {
    type: [{ type: { type: String }, value: String }],
    required: true,
  },
  inventory: {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
})

const ProductModel = model<IProduct>('Product', productSchema)

export default ProductModel
