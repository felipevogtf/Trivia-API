import "dotenv/config";
import express from 'express';
import './src/config/database.js';
import routes from "./src/routes/router.js";
import { swaggerDocs, swaggerRoute } from "./src/config/swagger.js";


const app = express();

const hostname = process.env.RAILWAY_STATIC_URL;
const port = process.env.PORT;

app.use(express.json())
swaggerDocs(app); 
app.use('/', routes)

app.listen(port, () => {
    console.log(`App listening on ${hostname}:${port}`);
    console.log(`Swagger listening on ${hostname}:${port}${swaggerRoute}`);
})