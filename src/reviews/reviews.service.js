const knex = require("../db/connection")

//read function 
function read(reviewId){
    return knex("reviews")
    .select("*")
    .where({review_id: reviewId})
    .first()
}
//set critics
async function setCritic(review){
  review.critic = await listCriticById(review.critic_id)
  return review
}
//read reviews for a movie
function readReviewsByMovieId(movieId){
  return knex("reviews")
  .where({movie_id: movieId})
  .then((reviews) => Promise.all(reviews.map(setCritic)))
}
//update function
function update(review){
return knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .where({ review_id: review.review_id })
        .update(review, "*")
        .then((review)=>{
  review[0]
})
}
//delete function
function destroy(review_id){
    return knex("reviews")
    .where({review_id})
    .del()
}

//List critic by id
function listCriticById(criticId){
    return knex("critics")
    .select("*")
    .where({critic_id: criticId})
    .first()
}

//exports
module.exports = {
    readReviewsByMovieId,
    update,
    read,
    destroy,
    listCriticById,
}
