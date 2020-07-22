// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Handlebars engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's Login status
app.use(session({ secret: "kcat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/song-api-routes.js")(app);
require("./routes/playlist-api-routes.js")(app);
require("./routes/spotify-routes.js")(app);
require("./routes/passport-api-routes.js")(app);
require("./routes/search-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
