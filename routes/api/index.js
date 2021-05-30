const router = require("express").Router();
const playlistRoutes = require("./playlist-api-routes");
const searchRoutes = require("./search-routes");
const songRoutes = require("./song-api-routes");
const userRoutes = require("./user-routes");

router.use("/playlists", playlistRoutes);
router.use("/songs", songRoutes);
router.use("/users", userRoutes);

module.exports = router;
