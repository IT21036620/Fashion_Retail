import mongoose from 'mongoose'

const connectDB = async (url) => {
  try {
    const connection = await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`)
  }
}

export default connectDB
