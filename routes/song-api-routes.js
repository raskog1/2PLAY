const db = require("../models");
const { Op } = require("sequelize");

module.exports = function(app) {
  // Get all tracks in songs database
  app.get("/api/songs", (req, res) => {
    db.Song.findAll({}).then(function(allSongs) {
      res.json(allSongs);
    });
  });

  // Get all tracks missing pilot ratings
  app.get("/api/songs/pilot", (req, res) => {
    db.Song.findAll({
      where: {
        pilot_rating: {
          [Op.is]: null,
        },
      },
    }).then(function(unratedSongs) {
      res.json(unratedSongs);
    });
  });

  // Get all tracks missing copilot ratings
  app.get("/api/songs/copilot", (req, res) => {
    db.Song.findAll({
      where: {
        copilot_rating: {
          [Op.is]: null,
        },
      },
    }).then(function(unratedSongs) {
      res.json(unratedSongs);
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
    db.Song.update(
      {
        pilot_rating: req.body.pilot_rating,
        copilot_rating: req.body.copilot_rating,
        avg_rating: (pilot_rating + copilot_rating) / 2,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then(function(updatedSong) {
      res.json(updatedSong);
    });
  });
};
