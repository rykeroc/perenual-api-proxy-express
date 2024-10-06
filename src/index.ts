import express, { Application } from 'express';
import {specs, swaggerUi} from "./swagger";
import perenualRouter, {perenaulApiKeyMiddleware} from "./api/perenual";
import {PORT} from "./env";
import logger from "./logging";
import {defaultHandler} from "./defaultHandler";

// Init the application
const app: Application = express();

app.use("*", (req, res, next) => {
    logger.info(req.baseUrl)
    next()
})

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Server Health
app.get('/health', (_req, res) => {
    const json = { status: 'UP', message: 'Service is healthy' }
    logger.info(json)
    res.status(200).json(json);
});

// Middleware to check for Perenual API key
app.use(perenaulApiKeyMiddleware)

// Add app routers
app.use('/api', perenualRouter)

// Error handler middleware
app.use(defaultHandler)

// Start app
const server = app.listen(PORT, () => {
    logger.info(`Server started at http://localhost:${PORT}`);
});

export {
    app, server
};