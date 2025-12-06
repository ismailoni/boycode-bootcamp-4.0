import express from 'express';
const app = express();

// Importing Middleware
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';

// Importing Routes
import exerciseRoutes from './routes/exerciseRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';


app.use(express.json());

app.use(logger);


// Routes
app.use('/api/exercises', exerciseRoutes);
app.use('/api/sessions', sessionRoutes);


// Middleware: errorHandler
app.use(errorHandler);

export default app;