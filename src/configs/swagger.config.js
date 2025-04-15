const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

function swaggerConfig(app) {
    const swaggerDocument = swaggerJsdoc({
        definition: {
            openapi: "3.0.4",
            info: {
                title: "Divar-Backend",
                description: "My first project",
                version: "1.0.0"
            }
        },
        apis: [process.cwd() + "/src/modules/**/*.swagger.js"]
    });
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
module.exports = swaggerConfig;