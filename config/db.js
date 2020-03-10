const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI') // The URI defined in default.json file

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true, // Added to get rid of some warnings when connect
      useUnifiedTopology: true
    })
    console.log('Connected to the MongoDB..')
  } catch (err) {
    console.error(err.message)
    process.exit(1) // Exit process with failure
  }
}

module.exports = connectDB
