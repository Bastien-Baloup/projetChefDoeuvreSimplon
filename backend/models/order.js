const mongoose = require('mongoose')

const orderProductSchema = mongoose.Schema(
  {
    product_id: { type: mongoose.ObjectId, required: true },
    count: { type: Number, required: true }
  }
)

const orderSchema = mongoose.Schema(
  {
    client_email: { type: String, required: true },
    delivery_address: { type: String, required: true },
    date: { type: Date, default: Date.now },
    products: [{ type: orderProductSchema, required: true }],
    price: { type: String, required: true },
    billId: { type: String, required: true },
    validated: { type: Boolean, required: true },
    trackingNumber: { type: String },
    delivered: { type: Boolean, required: true }
  }
)

module.exports = mongoose.model('Order', orderSchema)
