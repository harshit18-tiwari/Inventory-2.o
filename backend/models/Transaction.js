const mongoose = require('mongoose')


const TransactionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  sku: { type: String, required: true },
  delta: { type: Number, required: true },
  type: { type: String, enum: ['in', 'out', 'adjust'], default: 'adjust' },
  user: { type: String, default: 'system' },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Transaction', TransactionSchema)
