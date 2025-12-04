const reviews = require('../data/review');
const movies = require('../data/movie');
const generateId = require('../utils/generateId');

//function to check if a movie exists
const movieExists = (movieId) => {
    return movies.some(movie => movie.id === parseInt(movieId, 10));
};

// GET /api/movies/:movieId/reviews - Get all reviews for a specific movie
exports.getReviewsByMovie = (req, res, next) => {
    const movieId = parseInt(req.params.movieId, 10);

    // Make sure the movie ID exists
    if (!movieExists(movieId)) {
        return res.status(404).json({ message: `Movie with ID ${movieId} not found.` });
    }
    const movieReviews = reviews.filter(review => review.movieId === movieId);
    
    res.json(movieReviews);
};

// GET /api/reviews/:id - Get a single review by its ID
exports.getReviewById = (req, res, next) => {
    const reviewId = parseInt(req.params.id, 10);
    const review = reviews.find(r => r.id === reviewId);

    if (!review) {
        return res.status(404).json({ message: `Review with ID ${reviewId} not found.` });
    }

    res.json(review);
};

// POST /api/movies/:movieId/reviews - Create a new review for a movie
exports.createReview = (req, res, next) => {
    const movieId = parseInt(req.params.movieId, 10);

    // 1. Validate movie and request for body
    if (!movieExists(movieId)) {
        return res.status(404).json({ message: `Cannot create review: Movie with ID ${movieId} not found.` });
    }

    // Create new review object
    const newReview = {
        id: generateId(reviews),
        movieId: movieId,
        reviewer: req.body.reviewer,
        comment: req.body.comment,
        stars: parseInt(req.body.stars, 10) // TO make sure that stars is stored as a number
    };

    reviews.push(newReview);
    res.status(201).json(newReview);
};

// DELETE  - Delete a review
exports.deleteReview = (req, res, next) => {
    const reviewId = parseInt(req.params.id, 10);
    const initialLength = reviews.length;

    reviews.splice(reviews.findIndex(r => r.id === reviewId), 1);
    
    if (reviews.length === initialLength) {
        return res.status(404).json({ message: `Review with ID ${reviewId} not found.` });
    }
    res.status(204).send(); 
};