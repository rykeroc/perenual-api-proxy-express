import express, { Application } from 'express';
import {specs, swaggerUi} from "./swagger";
import perenualRouter from "./api/perenual";
import {PORT} from "./env";
import logger from "./logging";

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


// Add app routers
app.use('/api', perenualRouter)


// Start app
app.listen(PORT, () => {
    logger.info(`Server started at http://localhost:${PORT}`);
});