const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
    client_email: { type: String, required: true },
    delivery_phone: { type: String, required: true },
    delivery_address: { type: String, required: true },
    date: { type: Date, default: Date.now },
    products: [{ type: mongoose.ObjectId, required: true }],
    price: { type: String, required: true },
    billId: { type: String, required: true },
    validated: { type: Boolean, required: true },
    trackingNumber: { type: String, required: true },
    delivered: { type: Boolean, required: true }
  }
)

module.exports = mongoose.model('Order', orderSchema)
