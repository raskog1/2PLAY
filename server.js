// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/song-api-routes.js")(app);
require("./routes/playlist-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});


// // Requiring necessary npm packages
// const express = require("express");
// const session = require("express-session");
// // Requiring passport as we've configured it
// const passport = require("./config/passport");

// // Setting up port and requiring models for syncing
// const PORT = process.env.PORT || 8080;
// const db = require("./models");

// // Creating express app and configuring middleware needed for authentication
// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));
// // We need to use sessions to keep track of our user's login status
// app.use(
//   session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // Requiring our routes
// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

// // Syncing our database and logging a message to the user upon success
// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });
