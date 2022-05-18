const theatersService = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//list controller
async function list(req,res,next){
  const {movieId} = req.params
  if(!movieId){
  res.json({data: await theatersService.listTheaters()})
  }else{
    const theaters = theatersService.list()
    const findTheatersByMovie = theaters.map(async (theater)=> {
      return {...theater, movies: await theatersService.listTheatersByMovieId(theater)}
    })
    const info = await Promise.all(findTheatersByMovie)
    res.json({data: info})
  }
}


module.exports = {
  list: asyncErrorBoundary(list),
}