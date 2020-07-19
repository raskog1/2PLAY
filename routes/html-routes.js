// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {
  // landing route loads landing.html
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/landing.html"));
  });

  app.get("/rooms", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/rooms.html"));
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/roomLogin", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/roomLogin.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/mainMenu.html"));
    res.render("mainMenu");
  });

  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/search.html"));
  });

  app.get("/new", function(req, res) {
    res.render("new");
  });

  app.get("/existing", function(req, res) {
    res.render("existing");
  });

  app.get("/incomplete", function(req, res) {
    res.render("complete");
  });

  app.get("/complete", function(req, res) {
    res.render("complete");
  });

  app.get("/main", function(req, res) {
    res.render("mainMenu");
  });
};
