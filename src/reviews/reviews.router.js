//Basic imports and requires
const router = require("express").Router({mergeParams: true})
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")
//Router
router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)

//basic router
router
  .route("/")
  .get(controller.readByMovieId)
  .all(methodNotAllowed)
module.exports = router