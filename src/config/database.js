import mongoose from 'mongoose';

const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DB = process.env.DB_NAME;

try {
    await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);
    console.log("Se conecto a la base de datos");
} catch (error) {
    console.log(error);
}

// function databaseConnection() {
//     mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`).then(() => {
//         console.log("Se conecto a la base de datos");
//     }).catch(err => console.log(err));
// }

// export default databaseConnection;

// const triviaSchema = new Schema({
//     titulo: String,
//     descripcion: String,
//     es_privada: Boolean
// });

// const Trivia = model('Trivia', triviaSchema);

// const trivia = new Trivia({
//     titulo: "Trivia de prueba",
//     descripcion: "",
//     es_privada: false
// });

// trivia.save().then(result => {
//     console.log(result);
//     mongoose.connection.close();
// }).catch(err => console.log(err));

// Trivia.find({}).then(result => { console.log(result) });