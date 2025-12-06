import express from 'express';
const app = express();

// // Importing Middleware
// import logger from './middleware/logger.js';
// import errorHandlers from './middleware/errorHandlers.js';

// Importing Routes
import exerciseRoutes from './routes/exerciseRoutes.js';
// import sessionRoutes from './routes/sessionRoutes.js';


app.use(express.json());

// app.use(logger);


// Routes
app.use('/api/exercises', exerciseRoutes);
// app.use('/api/sessions', sessionRoutes);


// Middleware: errorHandler
// app.use(errorHandlers);

export default app;