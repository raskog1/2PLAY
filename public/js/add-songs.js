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
      console.log(unrated);
      const header = $("<h4>")
        .text(`Songs that ${unrated[0].Playlist.pilot} needs to rate:`)
        .appendTo(".pilot");

      // Generate the list of songs awaiting pilot ratings
      populate(unrated, ".pilot", "pilots");
    });
  }

  function getCopilotUnrated(id) {
    // Create a header using the copilot's input
    $.get("/api/songs/copilot/" + id, (unrated) => {
      const header = $("<h4>")
        .text(`Songs that ${unrated[0].Playlist.copilot} needs to rate:`)
        .appendTo(".coPilot");

      // Generate the list of songs awaiting copilot ratings
      populate(unrated, ".coPilot", "copilots");
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
        frameborder: "0",
        allowtransparency: "true",
        allow: "encrypted-media",
      }).appendTo(`#${divName}${i}`);

      const rateIt = $("<button>")
        .text("RATE")
        .addClass("rateIt")
        .attr("data-id", id)
        .appendTo(`#${divName}${i}`);

      const stars = $("<div>")
        .addClass("rating-star")
        .addClass(`${id}`)
        .appendTo(`#${divName}${i}`);

      $("</br>").appendTo(location);
    }

    $(".rating-star").hillRate({
      stars: 5,
      imageStar: {
        default: "images/star-empty-gold.png",
        full: "images/star-full-gold.png",
        half: "images/star-half-gold.png",
      },
      valuesStar: [[1], [2], [3], [4], [5]],
      nameInput: "rating",
      responsive: true,
      showSelectedValue: false,
      edit: true,
    });

    $(".item-rate").css("width", "5%");
  }
});

// If time permits, do a check to see if song already exists in database
