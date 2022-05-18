//package requirements 
if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require('cors')
const app = express();

// Project File Requirements
const moviesRouter = require("./movies/movies.router")
const theatersRouter = require("./theaters/theaters.router")
const reviewsRouter = require("./reviews/reviews.router")
const errorHandle = require("./errors/errorHandle")
const notFound = require("./errors/notFound")

//express.json and cors
app.use(cors())
app.use(express.json())

//routers
app.use("/theaters", theatersRouter)
app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)

//error handdling
app.use(notFound)
app.use(errorHandle)


module.exports = app;
