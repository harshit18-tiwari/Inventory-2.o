const express = require('express')
const cors = require('cors')
const db = require('./db')
const { connect } = require('./mongo')
const Product = require('./models/Product')
const Supplier = require('./models/Supplier')
const Transaction = require('./models/Transaction')
const app = express()

app.use(cors())
app.use(express.json())

function makeId() {
  return Date.now().toString() + Math.random().toString(36).slice(2, 8)
}

// PRODUCTS
app.get('/api/products', async (req, res) => {
  try {
    const rows = await Product.find().lean()
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id
    let row = await Product.findOne({ id }).lean()
    if (!row) row = await Product.findOne({ sku: id }).lean()
    if (!row) return res.status(404).json({ error: 'Not found' })
    res.json(row)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/products', async (req, res) => {
  const p = req.body
  const id = makeId()
  try {
    const created = await Product.create({
      id,
      sku: p.sku,
      name: p.name,
      description: p.description || '',
      price: p.price || 0,
      quantity: p.quantity || 0,
      reorder: p.reorder || 5,
      supplier: p.supplier || null,
      createdAt: new Date(),
    })
    res.status(201).json(created)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.put('/api/products/:id', async (req, res) => {
  const p = req.body
  const id = req.params.id
  try {
    const updated = await Product.findOneAndUpdate({ id }, {
      sku: p.sku,
      name: p.name,
      description: p.description || '',
      price: p.price || 0,
      quantity: p.quantity || 0,
      reorder: p.reorder || 5,
      supplier: p.supplier || null,
    }, { new: true }).lean()
    if (!updated) return res.status(404).json({ error: 'Not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.delete('/api/products/:id', async (req, res) => {
  const id = req.params.id
  try {
    await Product.deleteOne({ id })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Adjust stock: updates product quantity and creates a transaction
app.post('/api/products/:sku/adjust', async (req, res) => {
  const { sku } = req.params
  const { delta = 0, type = 'manual', user = 'system' } = req.body
  const txId = makeId()
  try {
    const product = await Product.findOne({ sku })
    if (!product) return res.status(404).json({ error: 'Product not found' })
    product.quantity = Math.max(0, (product.quantity || 0) + delta)
    await product.save()
    const tx = await Transaction.create({ id: txId, sku, delta, type, user, createdAt: new Date() })
    res.json({ product: product.toObject(), transaction: tx.toObject() })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// SUPPLIERS
app.get('/api/suppliers', async (req, res) => {
  try {
    const rows = await Supplier.find().lean()
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/suppliers', async (req, res) => {
  const s = req.body
  const id = makeId()
  try {
    const created = await Supplier.create({ id, name: s.name, email: s.email || '', phone: s.phone || '', address: s.address || '', createdAt: new Date() })
    res.status(201).json(created)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// TRANSACTIONS
app.get('/api/transactions', async (req, res) => {
  try {
    const rows = await Transaction.find().sort({ createdAt: -1 }).lean()
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const port = process.env.PORT || 4000

connect().then(() => {
  console.log('MongoDB connected')
  app.listen(port, () => {
    console.log('Inventory backend listening on port', port)
  })
}).catch((err) => {
  console.error('MongoDB connection failed — starting server without Mongo:', err.message || err)
  app.listen(port, () => {
    console.log('Inventory backend listening on port', port)
  })
})
