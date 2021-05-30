const axios = require("axios");
const db = require("../../models");

module.exports = function (app) {
  // Song search via Spotify API feeding in title and/or artist
  app.get("/api/search/:title/:artist?", (req, res) => {
    const access_token = req.cookies["spotifyAccessToken"];

    // Executes search based on track title
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
      console.log(response.data);
    });
  });

  // Write playlist in user's Spotify using Spotify API
  app.post("/api/post-playlist/:id", async (req, res) => {
    // Get the Spotify access token
    const token = req.cookies["spotifyAccessToken"];

    // Get the playlist name as entered when originally created
    const {
      dataValues: { name }, // Deconstructing "name" variable
    } = await db.Playlist.findOne({
      where: {
        id: req.params.id,
      },
    });

    // Get the user idea using a GET request from Spotify
    const results = await axios({
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    // Create the playlist using all acquired data
    try {
      const lastResult = await axios({
        method: "POST",
        url: `https://api.spotify.com/v1/users/${results.data.id}/playlists`,
        data: { name: name, public: false },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      // console.log(lastResult);
    } catch (error) {
      console.log(error.data.error);
    }
  });
};
