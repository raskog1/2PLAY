//const results = require("../public/js/song-search");
const axios = require("axios");

module.exports = function(app) {
  app.get("/api/search/:title/:artist?", (req, res) => {
    const access_token = process.env.spotify_token;
    let queryURL =
      "https://api.spotify.com/v1/search?type=track&market=US&q=" +
      req.params.title;
    if (req.params.artist) {
      queryURL += "%20" + req.params.artist;
    }

    axios({
      url: queryURL,
      headers: {
        Authorization: "Bearer " + access_token,
      },
      method: "GET",
    }).then((response) => {
      //console.log(response.data);
      res.json(response.data);
    });
  });

  // app.get("/api/tracks", (req, res) => {
  //   res.json(results);
  // });
};
