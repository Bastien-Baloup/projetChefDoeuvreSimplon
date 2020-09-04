const mongoose = require('mongoose')

const clientSchema = mongoose.Schema(
  {
    full_name: { type: String, required: true },
    email_address: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    addresses: [{ type: String, required: true }]
  }
)

module.exports = mongoose.model('Client', clientSchema)
