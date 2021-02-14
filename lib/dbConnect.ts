/* This is a database connection function*/
import mongoose from "mongoose";

const connection: any = {}; /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our database*/

  if (connection.isConnected) {
    return;
  } else {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    if (!process.env.MONGODB_URI) throw new Error("DB_URI not found!");
    /* connecting to our database */
    const db = await mongoose.connect(process.env.MONGODB_URI, options);

    connection.isConnected = db.connections[0].readyState;
  }
}

export default dbConnect;
