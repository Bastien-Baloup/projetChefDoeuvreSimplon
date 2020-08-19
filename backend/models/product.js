const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    sale: { type: Number, required: true },
    imgSrc: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: String, required: true },
    brand: { type: String, required: true },
    tags: [String],
    stock: { type: Number, required: true },
    addDate: { type: Date, default: Date.now }
  }
)
productSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Product', productSchema)
