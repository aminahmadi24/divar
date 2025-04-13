const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

function swaggerConfig(app) {
    const swaggerDocument = swaggerJsdoc({
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Divar-Backend",
                description: "First project",
                version: "1.0.0"
            }
        },
        apis: []
    });
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
module.exports = swaggerConfig;