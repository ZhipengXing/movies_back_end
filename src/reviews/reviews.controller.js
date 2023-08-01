const reviewService = require("./reviews.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const review = await reviewService.read(req.params.reviewId);
  // const review = await reviewService.readReviewWithCritic(req.params.reviewId);
  console.log("reviewId", req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

function readReviewWithCritic(req, res, next) {
  const { review: data } = res.locals;
  res.json({ data });
}

async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await reviewService.update(updatedReview);
  res.json({ data });
}

async function destroy(req, res, next) {
  const { review } = res.locals;
  await reviewService.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  readReviewWithCritic: [
    asyncErrorBoundary(reviewExists),
    readReviewWithCritic,
  ],
};
