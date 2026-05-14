const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  quantity: { type: Number, default: 0 },
  reorder: { type: Number, default: 5 },
  supplier: { type: String, ref: 'Supplier' },
  price: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Product', ProductSchema)
