const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/inventory'

function connect() {
  return mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

// Helpful connection event logging for runtime visibility
mongoose.connection.on('connected', () => {
  console.log('[mongo] connected')
})
mongoose.connection.on('error', (err) => {
  console.error('[mongo] connection error', err && err.message ? err.message : err)
})
mongoose.connection.on('disconnected', () => {
  console.log('[mongo] disconnected')
})
mongoose.connection.on('reconnected', () => {
  console.log('[mongo] reconnected')
})

module.exports = { connect, mongoose }
