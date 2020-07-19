$(document).ready(() => {
  getPilotUnrated();
  // getCopilotUnrated();

  let url = window.location.search;
  let currentPlaylist;

  getPlaylistID();

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

  function addSong(songData) {
    $.post("/api/songs", songData).then(
      console.log(`Successfully added ${songData.title} to the database`)
    );
  }

  function getPlaylistID() {
    if (url.indexOf("?playlist_id=") !== -1) {
      currentPlaylist = url.split("=")[1];
    }

    console.log(currentPlaylist);
    //   $.get("/api/playlist_data", (response) => {
    //     console.log(response.name);
  }

  function getPilotUnrated() {
    $.get("/api/songs/pilot", function(unrated) {
      //console.log(unrated);
    });
  }

  function getCopilotUnrated() {
    $.get("/api/songs/copilot", function(unrated) {
      for (let i = 0; i < unrated.length; i++) {
        console.log(unrated[i]);
      }
    });
  }
});

// If time permits, do a check to see if song already exists in database
