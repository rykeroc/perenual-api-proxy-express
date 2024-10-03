import express, { Application } from 'express';
import dotenv from "dotenv";
import {specs, swaggerUi} from "./swagger";
import {perenualRouter} from "./api/perenual";

// Init the application
const app: Application = express();

// Environment variables
dotenv.config();
const port = process.env.PORT || 8000;

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));


// Server Health
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'UP', message: 'Service is healthy' });
});


// Add app routers
app.use('/api', perenualRouter)


// Start app
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});