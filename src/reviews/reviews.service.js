const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const addCritic = mapProperties({
//   critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
//   movie_id: "critic.movie_id",
//   score: "critic.score",

//   updated_at: "critic.updated_at",
//   review_id: "critic.review_id",
});
function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

// function readReviewWithCritic(review_id) {
//   return knex("reviews as r")
//     .join("critics as c", "r.critic_id", "c.critic_id")
//     .select("r.*", "c.*")
//     .where({ "r.review_id": review_id })
//     .first();
// }

// function update(updatedReview) {
//   return knex("reviews as r")
//     .join("critics as c", "r.critic_id", "c.critic_id")
//     .select("r.*", "c.*")
//     .where({
//       review_id: updatedReview.review_id,
//     })
//     .update(updatedReview, "*")
//     .then((updatedRecords) => updatedRecords[0]);
// }

// async function update(updatedReview) {
//   const response = await knex("reviews as r")
//     .select("*")
//     .where({
//       review_id: updatedReview.review_id,
//     })
//     .update(updatedReview, "*")
//     .then((updatedRecords) => updatedRecords[0]);
//   console.log(response);

//   const responsePart2 = await knex("reviews as r")
//     .join("critics as c", "r.critic_id", "c.critic_id")
//     .select("*")
//     .where({ "r.review_id": updatedReview.review_id })
//     .first();

//   console.log("start here", responsePart2);

//   return responsePart2;
// }
function update(updatedReview) {
  knex("reviews as r")
    .select("*")
    .where({
      review_id: updatedReview.review_id,
    })
    .update(updatedReview, "*")
    .then((updatedRecords) => updatedRecords[0]);
  // console.log(response);

  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.review_id": updatedReview.review_id })
    .first()
    .then(addCritic);

  // console.log("start here", responsePart2);

  // return responsePart2;
}

// function update(updatedReview) {
//   // const updatedRecords = knex("review")
//   //   .where({
//   //     review_id: updatedReview.review_id,
//   //   })
//   //   .update(updatedReview, "*");

//   const response = knex("reviews as r")
//     .join("critics as c", "r.critic_id", "c.critic_id")
//     .select("*")
//     .where({ "r.review_id": updatedReview.review_id })
//     .first();
//   response.score = updatedReview.score;
//   response.content = updatedReview.content;
//   console.log(updatedReview);
//   console.log({response});
//   return response;
// }

//Question: how to update and join together?

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  read,
  update,
  delete: destroy,
};
