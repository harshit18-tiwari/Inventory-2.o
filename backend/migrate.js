const { connect } = require('./mongo')
const Product = require('./models/Product')
const Supplier = require('./models/Supplier')
const Transaction = require('./models/Transaction')
const fs = require('fs')
const path = require('path')

async function run() {
  await connect()
  const dbPath = path.join(__dirname, 'db.json')
  if (!fs.existsSync(dbPath)) {
    console.error('No db.json found to migrate')
    process.exit(1)
  }
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

  if (Array.isArray(data.products)) {
    for (const p of data.products) {
      await Product.findOneAndUpdate({ id: p.id }, { $set: p }, { upsert: true })
    }
    console.log('Migrated products:', data.products.length)
  }
  if (Array.isArray(data.suppliers)) {
    for (const s of data.suppliers) {
      await Supplier.findOneAndUpdate({ id: s.id }, { $set: s }, { upsert: true })
    }
    console.log('Migrated suppliers:', data.suppliers.length)
  }
  if (Array.isArray(data.transactions)) {
    for (const t of data.transactions) {
      await Transaction.findOneAndUpdate({ id: t.id }, { $set: t }, { upsert: true })
    }
    console.log('Migrated transactions:', data.transactions.length)
  }

  console.log('Migration complete')
  process.exit(0)
}

run().catch(err => {
  console.error('Migration failed', err)
  process.exit(2)
})
