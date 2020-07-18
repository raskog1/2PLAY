//required in new.handlebars, creates a new playlist

$(document).ready(function () {
  // jQuery references for playlist pilot, copilot, and name
  const pilotInput = $('#pilot');
  const copilotInput = $('#copilot');
  const playlistName = $('#playlist-name');
  const formIDgoeshere = $('#whateverFormIDisCalled'); //UPDATE HERE!!!

  // Submit event listener
  $(formIDgoeshere).on('submit', startNewPlaylist); //UPDATE HERE!!!

  function startNewPlaylist(event) {
    event.preventDefault();

    // If any fields are left blank, it won't submit
    if (
      !pilotInput.val().trim() ||
      !copilotInput.val().trim() ||
      !playlistName.val().trim()
    ) {
      return;
    }

    // Constructing the information needed to create a new playlist row
    const newPlaylist = {
      name: playlistName.val().trim(),
      pilot: pilotInput.val().trim(),
      copilot: copilotInput.val().trim(),
    };

    submitPlaylist(newPlaylist);
  }

  // Writes the playlist to the playlists table then redirects user
  function submitPlaylist(playlist) {
    $.post('/api/playlists', playlist, () => {
      window.location.href = '/endpointForNextPageHere'; //UPDATE HERE!!!
    });
  }
});
