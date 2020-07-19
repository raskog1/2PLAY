//required in new.handlebars, creates a new playlist

$(document).ready(function() {
  $(".mediaButton").css({
    width: "50px",
    height: "50px",
    marginTop: "-=530px",
  });

  // Submit event listener
  $("#create").on("click", function(event) {
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

    const playlistDetails = {
      name: playlistName.val().trim(),
      pilot: pilotInput.val().trim(),
      copilot: copilotInput.val().trim(),
    };

    submitPlaylist(playlistDetails);
  });

  // Writes the playlist to the playlists table then redirects user
  function submitPlaylist(playlist) {
    $.post("/api/playlists", playlist).then(
      // redirect("/existing")
      (window.location.href = "/existing")
    );
  }
});
