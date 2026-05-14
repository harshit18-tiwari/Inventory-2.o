const fs = require('fs')
const path = require('path')

const FILE = path.join(__dirname, 'db.json')

function load() {
  try {
    const raw = fs.readFileSync(FILE, 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    return { products: [], suppliers: [], transactions: [] }
  }
}

function save(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8')
}

function findByIdOrSku(arr, id) {
  return arr.find(x => x.id === id || x.sku === id)
}

const api = {
  getAllProducts() { const d = load(); return d.products },
  getProduct(id) { const d = load(); return findByIdOrSku(d.products, id) },
  createProduct(p) { const d = load(); d.products.push(p); save(d); return p },
  updateProduct(id, updates) { const d = load(); const idx = d.products.findIndex(x => x.id === id); if (idx === -1) return null; d.products[idx] = { ...d.products[idx], ...updates }; save(d); return d.products[idx] },
  deleteProduct(id) { const d = load(); d.products = d.products.filter(x => x.id !== id); save(d); },
  adjustStockBySku(sku, delta, tx) { const d = load(); const p = d.products.find(x => x.sku === sku); if (!p) return null; p.quantity = Math.max(0, (p.quantity || 0) + Number(delta)); d.transactions.unshift(tx); save(d); return { product: p, transaction: tx } },
  getSuppliers() { const d = load(); return d.suppliers },
  createSupplier(s) { const d = load(); d.suppliers.push(s); save(d); return s },
  getTransactions() { const d = load(); return d.transactions }
}

module.exports = api
