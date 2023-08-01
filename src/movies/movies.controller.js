const movieService = require("./movies.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await movieService.read(req.params.movieId);
  console.log("movieId", req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function list(req, res) {
  const is_showing = req.query.is_showing;
  // console.log(is_showing);

  if (is_showing) {
    const data = await movieService.listShowing();
    res.json({ data });
    //Question not sure how to do this. also seems like all movies are showing? current code seem to be working
  } else {
    const data = await movieService.list();
    res.json({ data });
  }
}

async function listReviews(req, res) {
  const data = await movieService.listReviews(req.params.movieId);
  res.json({ data });
}

async function listTheaters(req, res) {
  const data = await movieService.listTheaters(req.params.movieId);
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  list: asyncErrorBoundary(list),
  listReviews: [asyncErrorBoundary(movieExists), listReviews],
  listTheaters: [asyncErrorBoundary(movieExists), listTheaters],
};
