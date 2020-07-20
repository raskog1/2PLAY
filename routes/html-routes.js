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
      res.redirect("/main");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/roomLogin", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/main");
    }
    res.sendFile(path.join(__dirname, "../public/roomLogin.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/main", isAuthenticated, (req, res) => {
    res.render("mainMenu", {
      style: "styleMainMenu.css",
    });
  });

  app.get("/new", function(req, res) {
    res.render("new", {
      style: "styleNew.css",
    });
  });

  app.get("/existing", function(req, res) {
    res.render("existing", {
      style: "styleExisting.css",
    });
  });

  app.get("/incomplete", function(req, res) {
    res.render("complete", {
      style: "styleIncomplete.css",
    });
  });

  app.get("/complete", function(req, res) {
    res.render("complete", {
      style: "styleComplete.css",
    });
  });
};
