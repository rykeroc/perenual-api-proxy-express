import express, { Application } from 'express';

import {specs, swaggerUi} from "./swagger";
import perenualRouter from "./api/perenual";
import logger from "./logging";
import {defaultHandler} from "./defaultHandler";

// Init the application
const app: Application = express();

app.use("*", (req, _res, next) => {
    logger.info(req.baseUrl)
    next()
})

// Swagger documentation
if (process.env.NODE_ENV === "development") {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
}

// Server Health
app.get('/health', (_req, res) => {
    const json = { status: 'UP', message: 'Service is healthy' }
    logger.info(json)
    res.status(200).json(json);
    return
});

// Add app routers
app.use('/api', perenualRouter)

// Error handler middleware
app.use(defaultHandler)


export {
    app
};