const db = require("../models");

module.exports = function(app) {
  // Get all playslists that are flagged as completed
  app.get("/api/playlists/complete", (req, res) => {
    db.Playlist.findAll({
      where: {
        completed: true,
      },
    }).then(function(completePlaylists) {
      res.json(completePlaylists);
    });
  });

  // Get all incomplete playlists
  app.get("/api/playlists/incomplete", (req, res) => {
    db.Playlist.findAll({
      where: {
        completed: false,
      },
    }).then(function(incompletePlaylists) {
      res.json(incompletePlaylists);
    });
  });

  // Get a single playlist (complete or incomplete)
  app.get("/api/playlists/:id", (req, res) => {
    db.Playlist.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function(playlist) {
      res.json(playlist);
    });
  });

  // Create a new, empty playlist
  app.post("/api/playlists", (req, res) => {
    db.Playlist.create(req.body).then(function(newPlayist) {
      res.json(newPlaylist);
    });
  });

  // Delete playlist from playlists table
  // Should delete all songs associated with that playlist from songs table
  app.delete("/api/playlists/:id", (req, res) => {
    db.Playlist.destroy({
      where: {
        id: req.params.id,
      },
      include: [db.Song],
    }).then(function(results) {
      res.json(results);
    });
  });
};
