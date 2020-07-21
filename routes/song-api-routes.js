const db = require("../models");
const { Op } = require("sequelize");

module.exports = function(app) {
  // Get all tracks in songs database sorted by avg_rating
  app.get("/api/songs", (req, res) => {
    db.Song.findAll({
      where: {
        avg_rating: {
          [Op.gt]: 3.0,
        },
      },
      order: [["avg_rating", "DESC"]],
    }).then(function(allSongs) {
      res.json(allSongs);
    });
  });

  // Get all tracks missing pilot ratings
  app.get("/api/songs/pilot/:id", (req, res) => {
    db.Song.findAll({
      where: {
        PlaylistId: req.params.id,
        pilot_rating: {
          [Op.is]: null,
        },
      },
      include: [db.Playlist],
    }).then(function(unratedSongs) {
      res.json(unratedSongs);
    });
  });

  // Get all tracks missing copilot ratings
  app.get("/api/songs/copilot/:id", (req, res) => {
    db.Song.findAll({
      where: {
        PlaylistId: req.params.id,
        copilot_rating: {
          [Op.is]: null,
        },
      },
      include: [db.Playlist],
    }).then(function(unratedSongs) {
      res.json(unratedSongs);
    });
  });

  // Get all tracks with both pilot/copilot ratings
  app.get("/api/songs/rated", (req, res) => {
    db.Song.findAll({
      where: {
        avg_rating: {
          [Op.is]: null,
        },
        copilot_rating: {
          [Op.is]: !null,
        },
        pilot_rating: {
          [Op.is]: !null,
        },
      },
    }).then(function(fullRated) {
      res.json(fullRated);
    });
  });

  // Get all tracks with avg_rating above 3.1
  app.get("/api/songs/passing/:id", (req, res) => {
    db.Song.findAll({
      where: {
        PlaylistId: req.params.id,
        avg_rating: {
          [Op.gt]: 3.0,
        },
      },
    }).then(function(passingSongs) {
      res.json(passingSongs);
    });
  });

  // Post a new song to the songs table (without ratings)
  app.post("/api/songs", (req, res) => {
    db.Song.create(req.body).then(function(newSong) {
      res.json(newSong);
    });
  });

  // Update ratings for an existing song in the songs table
  app.put("/api/songs", (req, res) => {
    db.Song.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then(function(updatedSong) {
      res.json(updatedSong);
    });
  });
};
