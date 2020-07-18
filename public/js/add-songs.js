$(document).ready(() => {
  getPilotUnrated();
  getCopilotUnrated();

  $("body").on("click", ".suggest", function(event) {
    event.preventDefault();

    const title = $(this).data("title");
    const artist = $(this).data("artist");
    const id = $(this).data("id");
    const songData = {
      title: title,
      artist: artist,
      trackId: id,
    };

    addSong(songData);
  });

  function addSong(songData) {
    $.post("/api/songs", songData).then(
      console.log(`Successfully added ${songData.title} to the database`)
    );
  }

  function getPilotUnrated() {
    $.get("/api/songs/pilot", function(unrated) {
      for (let i = 0; i < unrated.length; i++) {
        console.log(unrated[i]);
      }
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
