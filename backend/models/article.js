const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const articleSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    admin: { type: String, required: true },
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    imgSrc: { type: String, required: true }
  }
)
articleSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Article', articleSchema)
