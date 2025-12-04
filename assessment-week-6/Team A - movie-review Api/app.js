const express = require("express");
const app = express();

//Importing Middleware
const logger = require('./middleware/logger')
const errorHandlers = require('./middleware/errorHandler');

//importing routes
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

//Middleware
app.use(express.json());
app.use(logger)

//Routes
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);

//Middleware: errorHandler
app.use(errorHandlers);

module.exports = app;