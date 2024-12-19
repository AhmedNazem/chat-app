import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const connectionDB = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `MongoDB connected successfully ${connectionDB.connection.host} 🟢`
    );
  } catch (error) {
    console.log(`failed to connect to DB due to ${error} 🔴`);
  }
};
