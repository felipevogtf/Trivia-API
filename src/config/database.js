import mongoose from "mongoose";

const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DB = process.env.DB_NAME;
const USER = process.env.DB_USER;
const PASSOWRD = process.env.DB_PASSWORD;

try {
  await mongoose.connect(`mongodb://${USER}:${PASSOWRD}@${HOST}:${PORT}/${DB}?authSource=admin`);
  console.log("Se conecto a la base de datos");
} catch (error) {
  console.log(error);
}
