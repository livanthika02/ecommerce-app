import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://livanthika02_db_user:Livan1302@ac-2xp1mpm-shard-00-00.6zpivgt.mongodb.net:27017,ac-2xp1mpm-shard-00-01.6zpivgt.mongodb.net:27017,ac-2xp1mpm-shard-00-02.6zpivgt.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-lvydf8-shard-0&authSource=admin"
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;