const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const reviewsService = require("./reviews.service")

//validation for if the review exists or not
async function reviewExists(req,res,next){
    const found = await reviewsService.read(Number(req.params.reviewId))
    if(found){
        res.locals.review = found
        return next()
    }
    return next({status:404, message: `Review cannot be found for id: ${req.params.reviewId}`})
}

//delete function
async function destroy(req,res,next){
    await reviewsService.destroy(Number(req.params.reviewId))
    res.sendStatus(204)
}

//update function 
async function update(req,res,next){
    const {critic_id,review_id} = res.locals.review
    const updated = {
      ...req.body.data,
      review_id: res.locals.review.review_id
    }
    await reviewsService.update(updated)
    const review = await reviewsService.read(Number(review_id))
    const returnReview = {
      ...review,
      update_at: "",
      created_at: "",
      critic: await reviewsService.listCriticById(critic_id)
    }
    res.json({data: returnReview})
}
//read by movie id
async function readByMovieId(req,res,next){
  const {movieId} = req.params
  res.json({data: await reviewsService.readReviewsByMovieId(movieId)})
}
module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    readByMovieId: asyncErrorBoundary(readByMovieId)
}