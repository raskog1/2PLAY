const axios = require("axios");

module.exports = function(app) {
  app.get("/api/search/:title/:artist?", (req, res) => {
    const access_token = req.cookies["spotifyAccessToken"];
    console.log(access_token);
    let queryURL =
      "https://api.spotify.com/v1/search?type=track&market=US&q=" +
      req.params.title;
    // If artist has a value, adds that to the query
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
      res.json(response.data);
    });
  });
};
