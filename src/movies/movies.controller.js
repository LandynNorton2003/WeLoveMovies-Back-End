const moviesService = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//validate if movie exists
async function movieExists(req,res,next){
  const {movieId} = req.params
  const movie = await moviesService.read(movieId)
  if(movie){
    res.locals.movie = movie
    return next()
  }else{
    next({status:404, message: 'Movie cannot be found.'})
  }
}

//list function
async function movieShowing(req,res,next){
  const {is_showing} = req.query
  if(is_showing){
      res.locals.movie = await moviesService.listShowing()
      return next()
  }else{
      res.locals.movie = await moviesService.list()
      return next()
  }
}

//read function
function read(req,res,next){
  res.json({data: res.locals.movie})
}
function list(req,res,next){
  res.json({data: res.locals.movie})
}

module.exports = {
    list: [movieShowing, asyncErrorBoundary(list)],
    read: [movieExists, asyncErrorBoundary(read)],
}