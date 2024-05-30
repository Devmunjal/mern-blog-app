const express = require("express");
const { authenticateUser } = require("../middlewares/authentication");
const {
  all,
  details,
  like,
  edit,
  deleteBlog,
  create,
} = require("../controllers/blogs");
const routes = express.Router();

routes.route("/:slug").get(details);
routes.route("/").get(all);

routes.use(authenticateUser);

routes.route("/:slug/like").post(like);
routes.route("/:slug").put(edit).delete(deleteBlog);
routes.route("/").post(create);

module.exports = routes;
