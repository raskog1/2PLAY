const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const exphbs = require("express-handlebars");
const routes = require("./routes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");

// Express middleware
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
app.use(routes);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
