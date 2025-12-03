# boycode-bootcamp-4.0
A backend RESTful API built using Node.js and Express.js, designed to manage movies and user reviews.
This project showcases CRUD operations, nested routing, middleware, and input validation as part of a backend development assignment.

 Features
 Movie Module

Add a new movie

Get all movies (filtering, pagination & sorting included)

Get a movie by ID

Update full movie data (PUT)

Update partial movie data (PATCH)

Delete a movie


 Review Module (Nested Routes)

Add a new review for a specific movie

Get all reviews for a specific movie

Get a review by ID

Delete a review

Ensures every review references a valid movie

Project Structure
project/
│── app.js
│── package.json
│
├── controllers/
│   ├── movieController.js
│   └── reviewController.js
│
├── routes/
│   ├── movieRoutes.js
│   └── reviewRoutes.js
│
├── middleware/
│   ├── logger.js
│   └── errorHandler.js
│
└── data/
    ├── movies.js
    └── reviews.js

Installation & Setup

Ensure Node.js and npm are installed.

1️ Clone or download the project folder
cd MovieReviewProject

2️ Install Dependencies
npm install

3️ Start the Server
npm start


Server runs on:

http://localhost:3000

 API Endpoints

Method	Endpoint	Description
GET	/api/movies	Get all movies
POST	/api/movies	Create a movie
GET	/api/movies/:id	Retrieve movie by ID
PUT	/api/movies/:id	Update movie
PATCH	/api/movies/:id	Partially update movie
DELETE	/api/movies/:id	Delete movie

 Reviews (Nested Under Movies)
Method	Endpoint	Description
GET	/api/movies/:movieId/reviews	Get reviews for a movie
POST	/api/movies/:movieId/reviews	Add a review
GET	/api/movies/:movieId/reviews/:reviewId	Get review by ID
DELETE	/api/movies/:movieId/reviews/:reviewId	Delete review

Team Members & Roles
Team Member	Role	Tasks Completed
Ismail	Intermediate	Project setup, movie logic, complex validation
Joseph	Intermediate	Review module lead, nested routes, validation
Tolu	Beginner	Create/Delete Movies, 
Success	Beginner	Movie routes, validation messages, testing
John Abel	Beginner	review assistance,
AbdulRasaq	Beginner	Review routing, README, logger.js, testing, readMe.Md