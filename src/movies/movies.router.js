//Basic Imports and Requires
const router = require("express").Router()
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")
const theaterRoutes = require("../theaters/theaters.router")
const reviewsRoutes = require("../reviews/reviews.router")
//Route for movie
router
    .route("/:movieId")
    .get(controller.read)

//Basic Route
router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed)
//routes for reviews
router
  .use("/:movieId/reviews", reviewsRoutes)
  .all(methodNotAllowed)
//routes for theaters
router
  .use("/:movieId/theaters", theaterRoutes)
  .all(methodNotAllowed)

module.exports = router