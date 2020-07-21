$(document).ready(() => {
  let url = window.location.search;
  let currentPlaylist;

  getAverage();

  // Event listener for when any song is rated and the RATE button is clicked
  $("body").on("click", ".rateIt", function(event) {
    event.preventDefault();

    // Get the submitted rating
    let score = $(event.target)
      .parent()
      .find("input")
      .val();

    // Get the song id from the button data-id
    let songId = $(this).data("id");

    // Get the user from the parent, parent div data.user
    let user = $(this)
      .parent()
      .parent()
      .data("user");

    rateSong(user, songId, score);
  });

  // Grab the playlist ID from the URL
  function getPlaylistID() {
    if (url.indexOf("?playlist_id=") !== -1) {
      currentPlaylist = url.split("=")[1];
      return currentPlaylist;
    }
  }

  // Writes the user rating to the database, then checks to see if both users have rated
  function rateSong(user, songId, score) {
    // "if" statement differentiates between who is rating
    if (user === "pilot") {
      const ratingData = {
        id: songId,
        pilot_rating: score,
      };
      $.ajax({
        method: "PUT",
        url: "/api/songs",
        data: ratingData,
      }).then(function() {
        window.location.reload();
        getAverage();
      });
    } else if (user === "coPilot") {
      const ratingData = {
        id: songId,
        copilot_rating: score,
      };
      $.ajax({
        method: "PUT",
        url: "/api/songs",
        data: ratingData,
      }).then(function() {
        window.location.reload();
        getAverage();
      });
    }
  }

  // Finds all songs with pilot/copilot rating, and give average rating
  function getAverage() {
    console.log("firing");
    $.get("/api/songs/rated", (rated) => {
      rated.forEach((element) => {
        let a = element.pilot_rating;
        let b = element.copilot_rating;
        let c = (a + b) / 2;
        let average = {
          id: element.id,
          avg_rating: c,
        };

        $.ajax({
          method: "PUT",
          url: "/api/songs",
          data: average,
        });
      });
    }).then(calcPassing());
  }

  // In current playlist, calculates how many songs are above 3.0 avg_rating
  function calcPassing() {
    getPlaylistID();
    $.get(`/api/songs/passing/${currentPlaylist}`, (passing) => {
      if (passing.length >= 12) {
        console.log("Generate Button Can be Initiated!!!");
        generatePlaylist();
      } else {
        console.log(`You have ${passing.length} completed songs`);
      }
    });
  }

  // Takes the top 12 songs in the playlist above 3.0 avg_rating, and establishes the playlist
  function generatePlaylist() {
    console.log("It seemed to fire...");
    $.get("/api/songs", (playlist) => {
      console.log(playlist);
    });
  }
});
