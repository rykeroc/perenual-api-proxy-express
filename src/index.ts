import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

const { specs, swaggerUi } = require('./swagger');
const app: Application = express();

dotenv.config();
const port = process.env.PORT || 8000;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'UP', message: 'Service is healthy' });
});

// Start app
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});