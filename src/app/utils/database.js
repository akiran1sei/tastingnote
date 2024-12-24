// app/utils/database.js
import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const USER_NAME = "akiran1sei";
const USER_PASSWD = "akiran1sei";
const HOST_NAME = "cluster0.vgefpwi.mongodb.net";
const DB_NAME = "tasting_note";

const uri = `mongodb+srv://${USER_NAME}:${USER_PASSWD}@${HOST_NAME}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDBクライアント (NextAuth用)
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Mongoose接続 (既存の機能用)
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Success: Connected to MongoDB");
  } catch (err) {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
};

export { clientPromise, connectDB as default };
