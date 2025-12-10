import mongoose, { mongo } from "mongoose";

const ConnectToMongoDB = async () => {
  try {
    const connected = await mongoose.connect(
      process.env.MONGO_URL
    );

    console.log(`\nMongoDb connected! DB host: ${connected.connection.host}`);
  } catch (error) {
    console.error("Mongo Db connection error!!", error);
  }
};

export default ConnectToMongoDB;
