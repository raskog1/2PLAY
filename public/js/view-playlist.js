$(document).ready(function() {
  $(formIDgoeshere).on("submit", viewComplete); //UPDATE HERE!!!
  $(formIDgoeshere).on("submit", viewIncomplete); //UPDATE HERE!!!

  // View all completed playlists
  function viewComplete(event) {
    event.preventDefault();

    $.get("/api/playlists/complete", (completePlaylists) => {
      for (let i = 0; i < completePlaylists.length; i++) {
        console.log(completePlaylists[i].name);
      } // Insert code to generate button/list in HTML file
    });
  }

  // View all incomplete playlists
  function viewIncomplete(event) {
    event.preventDefault();

    $.get("/api/playlists/incomplete", (incompletePlaylists) => {
      for (let i = 0; i < incompletePlaylists.length; i++) {
        console.log(incompletePlaylists[i].name);
      } // Insert code to generate button/list in HTML file
    });
  }

  // When specific incomplete playlist is chosen, redirect to song/rating page
  function viewOneIncomplete(event) {
    event.preventDefault();

    const id = $("#whateverIDassociatedWithButton"); //UPDATE HERE!!!
    window.location.href = "/endpointForNextPageHere"; //UPDATE HERE!!!

    // After redirect, HTML elements need to be populated based on results
    // Pilot pending rating, copilot pending rating
  }

  // When specific complete playlist is chosen, generate list of songs dynamically
  function viewOneComplete(event) {
    event.preventDefault();
    // Insert code to pull either a list of song titles, or generate a list of
    // Spotify playbars
  }

  // When either playlist is deleted, remove playlist and songs from tables
  function deleteOne(event) {
    event.preventDefault();

    const id = $("#whateverIDassociatedWithButton"); //UPDATE HERE!!!
    $.delete(`/api/playlists/${id}`, (deletedPlaylist) => {
      console.log(`${deletedPlaylist.name} was deleted.`);
    });
  }
});
