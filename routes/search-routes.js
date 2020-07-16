const results = require("../public/js/song-results");

module.exports = function(app) {
  app.get("/api/tracks", (req, res) => {
    res.json(results);
  });

  app.post("/api/tracks", (req, res) => {
    results.push(req.body);
  });

  app.post("/api/clear", (req, res) => {
    results.length = 0;
  });
};
