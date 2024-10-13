import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB Connected:" + conn.connection.host);
  } catch (error) {
    console.log("error connecting DB" + error.message);
    process.exit(1);
  }
};
