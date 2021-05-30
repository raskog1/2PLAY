const router = require("express").Router();
const db = require("../../models");

// POST "/api/playlists"
// Create a new, empty playlist
router.post("/", (req, res) => {
  db.Playlist.create(req.body).then((newPlaylist) => {
    res.json(newPlaylist);
  });
});

// GET "/api/playlists/:id"
// Get a single playlist (complete or incomplete) given a playlist id
router.get("/:id", (req, res) => {
  db.Playlist.findOne({
    where: {
      id: req.params.id,
    },
  }).then((playlist) => {
    res.json(playlist);
  });
});

// PUT "/api/playlists/:id"
// Updates a playlist (ideally changing complete to true)
router.put("/:id", (req, res) => {
  db.Playlist.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updatedPlaylist) => {
    res.json(updatedPlaylist);
  });
});

// DELETE "/api/playlists/:id"
// Delete playlist from playlists table
// Should delete all songs associated with that playlist from songs table
router.delete("/:id", (req, res) => {
  db.Playlist.destroy({
    where: {
      id: req.params.id,
    },
    include: [db.Song],
  }).then((results) => {
    res.json(results);
  });
});

// GET "/api/playlists/all/:id"
// Get all playlists from a given user id
router.get("/all/:id", (req, res) => {
  db.Playlist.findAll({
    where: {
      UserId: req.params.id,
    },
  }).then((userPlaylists) => {
    res.json(userPlaylists);
  });
});

// GET "/api/playlists/complete/:id"
// Get all complete playlists from a given user id
router.get("/complete/:id", (req, res) => {
  db.Playlist.findAll({
    where: {
      UserId: req.params.id,
      completed: true,
    },
  }).then((completePlaylists) => {
    res.json(completePlaylists);
  });
});

// GET "/api/playlists/incomplete/:id"
// Get all incomplete playlists from a given user id
router.get("/incomplete/:id", (req, res) => {
  db.Playlist.findAll({
    where: {
      UserId: req.params.id,
      completed: false,
    },
  }).then((incompletePlaylists) => {
    res.json(incompletePlaylists);
  });
});

module.exports = router;
