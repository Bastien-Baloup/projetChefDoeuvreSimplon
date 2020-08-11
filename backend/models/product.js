const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    sale: { type: Number, required: true },
    imgSrc: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: String, required: true }],
    brands: [{ type: String, required: true }],
    tags: [String],
    stock: { type: Number, required: true },
    addDate: { type: Date, default: Date.now }
  }
)

module.exports = mongoose.model('Product', productSchema)
