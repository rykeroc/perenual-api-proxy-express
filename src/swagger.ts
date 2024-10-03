const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Perenual API Proxy',
            version: '1.0.0',
            description: 'A simple Perenual API Proxy',
        },
    },
    apis: ['./routes/*.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

export {
    swaggerUi,
    specs
}
