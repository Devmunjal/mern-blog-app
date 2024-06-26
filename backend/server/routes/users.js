const express = require("express");
const { register, login } = require("../controllers/users");
const routes = express.Router();

routes.route("/register").post(register);
routes.route("/login").post(login);

module.exports = routes;
