import express, { Application } from 'express';
import {specs, swaggerUi} from "./swagger";
import perenualRouter from "./api/perenual";
import {PORT} from "./env";

// Init the application
const app: Application = express();

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));


// Server Health
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'UP', message: 'Service is healthy' });
});


// Add app routers
app.use('/api', perenualRouter)


// Start app
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});