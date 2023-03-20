import mongoose from "mongoose";

const HOST = process.env.MONGOHOST;
const PORT = process.env.MONGOPORT;
const DB = process.env.DB_NAME;
const USER = process.env.MONGOUSER;
const PASSOWRD = process.env.MONGOPASSWORD;

try {
  await mongoose.connect(`mongodb://${USER}:${PASSOWRD}@${HOST}:${PORT}/${DB}?authSource=admin`);
  console.log("Se conecto a la base de datos");
} catch (error) {
  console.log(error);
}
