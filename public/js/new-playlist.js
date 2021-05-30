//required in new.handlebars, creates a new playlist
$(document).ready(function () {
  $(".mediaButton").css({
    width: "50px",
    height: "50px",
    marginTop: "-=530px",
  });

  // Submit event listener
  $("body").on("click", "#create", function (event) {
    event.preventDefault();

    // jQuery references for playlist pilot, copilot, and name
    const pilotInput = $("#pilotName");
    const copilotInput = $("#coPilotName");
    const playlistName = $("#playListName");

    // If any fields are left blank, it won't submit
    if (
      !pilotInput.val().trim() ||
      !copilotInput.val().trim() ||
      !playlistName.val().trim()
    ) {
      return;
    }

    // Obtain the user ID of the current user
    $.get("/api/users/user_data", (response) => {
      const playlistDetails = {
        name: playlistName.val().trim(),
        pilot: pilotInput.val().trim(),
        copilot: copilotInput.val().trim(),
        UserId: response.id,
      };

      submitPlaylist(playlistDetails);
    });

    // Writes the playlist to the playlists table then redirects user
    // Stores playlist id in url for future use
    function submitPlaylist(playlist) {
      $.post("/api/playlists", playlist).then(function (result) {
        window.location.href = "/existing?playlist_id=" + result.id;
      });
    }
  });
});
