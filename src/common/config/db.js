import mongoose from "mongoose";

const dbConnection = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  // console.log(conn);
  //
  console.log(`MONGODB CONNECTED: ${conn.connection.host}`);
};

export default dbConnection;
