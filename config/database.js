const mongoose = require('mongoose');

async function connect() {
  try {
    if (process.env.NODE_ENV === 'production') {
      mongoose.connect(proxess.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
    } else {
      mongoose.connect(process.env.MONGO_DEV_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      console.log('Successfully connected to Database')
    }
  } catch (err) {
    console.error(err)
  }
}