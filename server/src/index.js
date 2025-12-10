import "./loadEnv.js";   

import { app } from "./app.js";
import ConnectToMongoDB from "./db/connection.db.js";

const Port = process.env.PORT || 5000;

console.log("Starting the server");

ConnectToMongoDB()
  .then(() => {
    app.listen(Port, () => {
      console.log(`🚀 Server is running at PORT: ${Port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDb connection error!", err);
  });