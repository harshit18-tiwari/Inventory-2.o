const mongoose = require('mongoose')


const SupplierSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Supplier', SupplierSchema)
