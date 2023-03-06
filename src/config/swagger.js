import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerRoute = '/api/docs';

const document = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Trivia API",
            version: "1.0.0"
        }
    },
    apis: [
        "./src/routes/api/*.route.js", "./src/models/*.model.js"
    ]
}

const options = {
    customSiteTitle: "Trivia API",
}

const swaggerSpec = swaggerJSDoc(document);

const swaggerDocs = (app) => {
    app.use(swaggerRoute, swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));
}

export { swaggerDocs, swaggerRoute };

