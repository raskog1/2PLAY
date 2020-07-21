const db = require("../models");

module.exports = function(app) {
  // Get all complete playlists from a given user id
  app.get("/api/playlists/complete/:id", (req, res) => {
    db.Playlist.findAll({
      where: {
        UserId: req.params.id,
        completed: true,
      },
    }).then(function(completePlaylists) {
      res.json(completePlaylists);
    });
  });

  // Get all incomplete playlists from a given user id
  app.get("/api/playlists/incomplete/:id", (req, res) => {
    db.Playlist.findAll({
      where: {
        UserId: req.params.id,
        completed: false,
      },
    }).then(function(incompletePlaylists) {
      res.json(incompletePlaylists);
    });
  });

  // Get all playlists from a given user id
  app.get("/api/playlists/:id", (req, res) => {
    db.Playlist.findAll({
      where: {
        UserId: req.params.id,
      },
    }).then(function(userPlaylists) {
      res.json(userPlaylists);
    });
  });

  // Get a single playlist (complete or incomplete) given a playlist id
  app.get("/api/playlist/:id", (req, res) => {
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
    db.Playlist.create(req.body).then(function(newPlaylist) {
      res.json(newPlaylist);
    });
  });

  // Updates a playlist (ideally changing complete to true)
  app.put("/api/playlists/:id", (req, res) => {
    db.Playlist.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(function(updatedPlaylist) {
      res.json(updatedPlaylist);
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
