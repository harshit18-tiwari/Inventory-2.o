const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/inventory'

function connect() {
  return mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = { connect, mongoose }
