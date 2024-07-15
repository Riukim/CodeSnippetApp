import mongoose from "mongoose"

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string)
    console.log("db connected...");
  } catch (error) {
    console.log(error)
  }
}

export default connect