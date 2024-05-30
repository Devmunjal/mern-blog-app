const express = require("express");
const userRoutes = require('./users');
const blogRoutes = require("./blogs");
const routes = express.Router();

routes.get("/health-check", (req, res) => {
    res.send('Application Working Fine')
});

routes.use('/user', userRoutes);
routes.use('/blog', blogRoutes);

module.exports = routes;
