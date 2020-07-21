//need for complete.handlebars and existing.handlebars
$(document).ready(function() {
  $(".mediaButton").css({
    width: "50px",
    height: "50px",
    marginTop: "-=530px",
  });

  const path = window.location.pathname;
  const trackLimit = 12;

  getStatus();

  // Event listener for Playlist Generator button
  $("#generateComplete").on("click", function(event) {
    event.preventDefault();
    generatePlaylist();
  });

  // Event listener for selecting a playlist to work on
  $("body").on("click", ".playlistItem", function() {
    const id = $(this).data("id");
    window.location.href = "/existing?playlist_id=" + id;
  });

  // Event listener for selecting a completed playlist to view songs from
  $("body").on("click", ".completeList", function() {
    $(".track-listing").remove();

    const list = $("<ol>")
      .addClass("track-listing")
      .appendTo($(this).parent());
    $.get(`/api/songs/${$(this).data("id")}`, (songList) => {
      for (let i = 0; i < trackLimit; i++) {
        let track = $("<li>")
          .text(`${songList[i].title} by ${songList[i].artist}`)
          .addClass("track-info")
          .appendTo(".track-listing");
      }
    });
  });

  function getPlaylistID() {
    const url = window.location.search;
    if (url.indexOf("?playlist_id=") !== -1) {
      let currentPlaylist = url.split("=")[1];
      return currentPlaylist;
    }
  }

  // Searches URL for current page and executes related functions
  function getStatus() {
    if (path === "/complete") {
      $.get("/api/user_data", (response) => {
        viewComplete(response.id);
      });
    } else if (path === "/incomplete") {
      $.get("/api/user_data", (response) => {
        viewIncomplete(response.id);
      });
    }
  }

  // View all completed playlists
  function viewComplete(id) {
    $.get("/api/playlists/complete/" + id, (completePlaylists) => {
      if (completePlaylists.length < 1) {
        const notice = $("<h4>")
          .html(
            `There are no completed playlists, click <a href="/incomplete">here</a> to view playlists in progress`
          )
          .appendTo(".mb-5");
      } else {
        for (let i = 0; i < completePlaylists.length; i++) {
          const playlistDiv = $("<div>")
            .attr("id", `playlist${i}`)
            .appendTo(".mb-5");

          const listItem = $("<button>")
            .attr("data-id", completePlaylists[i].id)
            .addClass("btn btn-secondary editPlaylistButton completeList")
            .text(completePlaylists[i].name)
            .appendTo(`#playlist${i}`);

          const pushSpotify = $("<button>")
            .text("Push to Spotify")
            .addClass("btn btn-secondary editPlaylistButton spotifyPush")
            .appendTo(`#playlist${i}`);

          $("</br>").appendTo(`#playlist${i}`);
        }
      }
    });
  }

  // View all incomplete playlists
  function viewIncomplete(id) {
    $.get("/api/playlists/incomplete/" + id, (incompletePlaylists) => {
      if (incompletePlaylists.length < 1) {
        const notice = $("<h4>")
          .html(
            `There are no playlists in progress, click <a href="/new">here</a> to create one`
          )
          .appendTo(".mb-5");
      } else {
        for (let i = 0; i < incompletePlaylists.length; i++) {
          const listItem = $("<button>")
            .attr("data-id", incompletePlaylists[i].id)
            .addClass("btn btn-secondary editPlaylistButton playlistItem")
            .text(incompletePlaylists[i].name)
            .appendTo(".mb-5");

          $("</br>").appendTo(".mb-5");
          console.log(incompletePlaylists[i].name);
        }
      }
    });
  }

  // Takes the top 12 songs in the playlist above 3.0 avg_rating, and establishes the playlist
  function generatePlaylist() {
    let id = getPlaylistID();
    $.ajax({
      method: "PUT",
      url: `/api/playlists/${id}`,
      data: { completed: true },
    }).then(function() {
      window.location.replace("/complete");
      filterFailed(id);
    });
  }

  // Delete songs below 3.1 rating or null within selected playlist
  function filterFailed(playlistID) {
    $.get(`/api/songs/failed/${playlistID}`, (failedSongs) => {
      for (let i = 0; i < failedSongs.length; i++) {
        $.ajax({
          method: "DELETE",
          url: `/api/songs/${failedSongs[i].id}`,
        });
      }
    });
  }
});
