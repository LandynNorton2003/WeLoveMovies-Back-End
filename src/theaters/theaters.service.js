const knex = require("../db/connection")
const reduceProperties = require("../utils/reduce-properties")

//reduce function
const reducedTheaters = reduceProperties("theater_id",{
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url:  ["movies", null, "image_url"],
  m_created_at: ["movies", null, "created_at"],
  m_updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
  mt_theater_id: ["movies", null, "theater_id"]
})

//list theaters by movie id
function listTheatersByMovieId(movieId){
  return knex("movies_theaters as mt")
    .join("movies as m", "mt.movie_id","m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({"mt.movie_id": movieId})
    .distinct("mt.theater_id")
}


//list all theaters function
function listTheaters(){
    return knex("theaters as t")
  .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
  .join("movies as m","m.movie_id", "mt.movie_id")
  .select(
    "t.*",
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "m.created_at as m_created_at",
      "m.updated_at as m_updated_at",
      "mt.is_showing",
      "mt.theater_id as mt_theater_id"
    )
  .then(theaters => reducedTheaters(theaters))
}

module.exports = {
  listTheaters,
  listTheatersByMovieId
}