$(document).ready(() => {
    let url = window.location.search;
    let currentPlaylist;

    getPlaylistID();

    console.log(currentPlaylist);

    getPilotUnrated(currentPlaylist);
    getCopilotUnrated(currentPlaylist);

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
        $.post("/api/songs", songData).then(location.reload());
    }

    function getPlaylistID() {
        if (url.indexOf("?playlist_id=") !== -1) {
            currentPlaylist = url.split("=")[1];
        }

        console.log(currentPlaylist);
        //   $.get("/api/playlist_data", (response) => {
        //     console.log(response.name);
    }

    function getPilotUnrated(id) {
        $.get("/api/songs/pilot/" + id, (unrated) => {
            console.log(unrated);
            populate(unrated, ".pilot", "pilots");
        });
    }

    function getCopilotUnrated(id) {
        $.get("/api/songs/copilot/" + id, (unrated) => {
            console.log(unrated);
            populate(unrated, ".coPilot", "copilots");
        });
    }

    function populate(songArray, location, divName) {
        // If less than five search results, takes the length of the response
        const limit = songArray.length < 3 ? songArray.length : 3;

        for (let i = 0; i < limit; i++) {
            const id = songArray[i].id;
            const trackId = songArray[i].trackId;
            const title = songArray[i].title;
            const artist = songArray[i].artist;

            // Creating a div to house the iframe and button
            const songDiv = $("<div>")
                .attr("id", `${divName}${i}`)
                .appendTo(location);

            // Dynamically creating the iframes for playback of results
            const song = $("<iframe>", {
                src: `https://open.spotify.com/embed/track/${trackId}`,
                id: id,
                width: "300",
                height: "80",
                margin: "0",
                padding: "0",
                position: "relative",
                zIndex: "-1",
                frameborder: "0",
                allowtransparency: "true",
                allow: "encrypted-media",
            }).appendTo(`#${divName}${i}`);

            // Dynamically creating the "Suggest" button with data attributes
            const suggest = $("<button>", {
                    text: "RATE",
                })
                .addClass("rate")
                .addClass("btn btn-secondary rateButton")
                .attr("data-id", id)
                .attr("data-title", title)
                .attr("data-artist", artist)
                .appendTo(`#${divName}${i}`);

            $("</br>").appendTo(location);
        }
    }
});

// If time permits, do a check to see if song already exists in database