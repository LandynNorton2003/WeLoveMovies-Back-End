const knex = require("../db/connection")

//list function
function list(){
  return knex("movies").select("*")
}

function listShowing(){
  return knex("movies_theaters")
  .join("movies","movies_theaters.movie_id","movies.movie_id")
  .select("movies.*")
  .where({"movies_theaters.is_showing": true})
  .distinct("movies_theaters.movie_id")
}

//read function
function read(movieId){
  return knex("movies")
  .select("*")
  .where({movie_id: movieId})
  .first()
}

//exports
module.exports = {
  list,
  listShowing,
  read
}
