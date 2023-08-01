const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

router.route("/:movieId([0-9]+)").get(controller.read).all(methodNotAllowed);

router
  .route("/:movieId([0-9]+)/reviews")
  .get(controller.listReviews)
  .all(methodNotAllowed);

router
  .route("/:movieId([0-9]+)/theaters")
  .get(controller.listTheaters)
  .all(methodNotAllowed);
//Question: there is a "True" key for theaters? not sure how this is created
module.exports = router;
