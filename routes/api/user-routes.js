const router = require("express").Router();
const db = require("../../models");
const passport = require("../../config/passport");

router.post("/login", passport.authenticate("local"), (req, res) => {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({
    text: req.user.text,
    id: req.user.id,
  });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", (req, res) => {
  db.User.create({
    text: req.body.text,
    password: req.body.password,
  })
    .then(() => {
      res.redirect(307, "/api/users/login");
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.get("/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      text: req.user.text,
      id: req.user.id,
    });
  }
});

module.exports = router;
