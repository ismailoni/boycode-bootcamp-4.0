const express = require('express');
const router = express.Router();

/* importing controller module */
const movieController = require('../controllers/movieController');
const validateMovie = require('../middleware/validateMovie');
const reviewController = require('../controllers/reviewController');
const validateReview = require('../middleware/validateReview');


/* Movie Routes */
router.get('/', movieController.getAllMovies);
router.post('/', validateMovie, movieController.createMovie);
router.get('/top-rated', movieController.getTopRatedMovies);
router.get('/:id/stats', movieController.getMovieStats);
router.get('/:id', movieController.getMovieById);
router.put('/:id', movieController.updateMovie);
router.patch('/:id', movieController.partialUpdateMovie);
router.delete('/:id', movieController.deleteMovie);

//reviewRoutes
router.get('/movieId/reviews', reviewController.getReviewsByMovie);
router.post('/movieId/reviews', validateReview, reviewController.createReview);
module.exports = router;
