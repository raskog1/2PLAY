const router = require("express").Router();
const apiRoutes = require("./api");
const htmlRoutes = require("./html-routes");

router.use("/", htmlRoutes);
router.use("/api", apiRoutes);

// Route for logging user out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
