$(document).ready(() => {
  let url = window.location.search;
  let currentPlaylist;

  getPlaylistID();

  getPilotUnrated(currentPlaylist);
  getCopilotUnrated(currentPlaylist);

  // Event listener for when a user suggests a song for the playlist
  $("body").on("click", ".suggest", function(event) {
    event.preventDefault();

    const title = $(this).data("title");
    const artist = $(this).data("artist");
    const id = $(this).data("id");
    const songData = {
      title: title,
      artist: artist,
      trackId: id,
      PlaylistId: currentPlaylist,
    };

    addSong(songData);

    // Clears the results div and search inputs after suggesting a song
    $(".results").html("");
    $("#songSearchInput").val("");
    $("#artistSearchInput").val("");
  });

  // Add song to songs table, will be generated to be rated by both users
  function addSong(songData) {
    $.post("/api/songs", songData).then(location.reload());
  }

  // Grab the playlist ID from the URL
  function getPlaylistID() {
    if (url.indexOf("?playlist_id=") !== -1) {
      currentPlaylist = url.split("=")[1];
    }
  }

  function getPilotUnrated(id) {
    // Create a header using the pilot's input
    $.get("/api/songs/pilot/" + id, (unrated) => {
      if (unrated.length > 0) {
        const header = $("<h4>")
          .text(`Songs that ${unrated[0].Playlist.pilot} needs to rate:`)
          .appendTo(".pilot");

        // Generate the list of songs awaiting pilot ratings
        populate(unrated, ".pilot", "pilots");
      }
    });
  }

  function getCopilotUnrated(id) {
    // Create a header using the copilot's input
    $.get("/api/songs/copilot/" + id, (unrated) => {
      if (unrated.length > 0) {
        const header = $("<h4>")
          .text(`Songs that ${unrated[0].Playlist.copilot} needs to rate:`)
          .appendTo(".coPilot");

        // Generate the list of songs awaiting copilot ratings
        populate(unrated, ".coPilot", "copilots");
      }
    });
  }

  // Generate play button widgets from Spotify, rating stars, and rating button
  function populate(songArray, location, divName) {
    // If less than three search results, takes the length of the response
    const limit = songArray.length < 3 ? songArray.length : 3;

    for (let i = 0; i < limit; i++) {
      const id = songArray[i].id;
      const trackId = songArray[i].trackId;
      const title = songArray[i].title;
      const artist = songArray[i].artist;

      // Creating a div to house the iframe and button
      const songDiv = $("<div>")
        .attr("id", `${divName}${i}`)
        .attr("data-id", id)
        .attr("data-title", title)
        .attr("data-artist", artist)
        .appendTo(location);

      // Dynamically creating the iframes for playback of results
      const song = $("<iframe>", {
        src: `https://open.spotify.com/embed/track/${trackId}`,
        id: id,
        width: "300",
        height: "80",
        frameBorder: "0",
        allowTransparency: "true",
        allow: "encrypted-media",
      })
        .css({ border: "1px solid #ffe0ac", borderRadius: "4px" })
        .appendTo(`#${divName}${i}`);

      const stars = $("<div>")
        .addClass("rating-star")
        .addClass(`${id}`);

      const rateIt = $("<button>")
        .text("RATE")
        .addClass("rateIt btn btn-secondary rateButton")
        .attr("data-id", id)
        .appendTo(`#${divName}${i}`);

      stars.appendTo(`#${divName}${i}`);

      $("</br>").appendTo(location);
    }

    $(".rating-star").hillRate({
      stars: 5,
      imageStar: {
        default: "images/star-empty-gold.png",
        full: "images/star-full-gold.png",
        half: "images/star-half-gold.png",
      },
      valuesStar: [[0.5, 1], [1.5, 2], [2.5, 3], [3.5, 4], [4.5, 5]],
      nameInput: "rating",
      responsive: true,
      showSelectedValue: false,
      edit: true,
    });
  }
});

// If time permits, do a check to see if song already exists in database
