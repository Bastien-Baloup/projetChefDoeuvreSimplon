const mongoose = require('mongoose')

const articleSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    admin_id: { type: String, required: true },
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    imgSrc: { type: String, required: true }
  }
)

module.exports = mongoose.model('Article', articleSchema)
