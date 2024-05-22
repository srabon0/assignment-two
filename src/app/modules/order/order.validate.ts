import Joi from 'joi'

const joiOrderSchema = Joi.object({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(1).required(),
})

export default joiOrderSchema
