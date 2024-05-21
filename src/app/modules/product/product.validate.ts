import Joi from 'joi'

const joiProductSchema = Joi.object({
  name: Joi.string().max(30).required(),
  _id: Joi.string().optional(),
  description: Joi.string(),
  price: Joi.number().required(),
  category: Joi.string(),
  tags: Joi.array().items(Joi.string().min(4).max(10)).required(),
  variants: Joi.array().items(
    Joi.object({
      type: Joi.string(),
      value: Joi.string(),
    }),
  ),
  inventory: Joi.object({
    quantity: Joi.number().min(10).required(),
    inStock: Joi.boolean().default(true).required(),
  }).required(),
  __v: Joi.number().optional(),
})

export default joiProductSchema
