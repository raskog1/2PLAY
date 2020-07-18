$(document).ready(() => {
    $("#search").on("click", function(event) {
        event.preventDefault();

        //Search function, required for main handlebars
        // Clears results div each time a search is executed
        $("#results-div").html("");

        // Gets the input values from our search page
        const track = $("#songSearchInput")
            .val()
            .trim();
        const artist = $("#artistSearchInput")
            .val()
            .trim();

        searchHandle(track, artist);
    });

    // This searches based on title, or title/artist
    function searchHandle(trackTitle, artistName) {
        const baseURL = "http://localhost:8080";
        const queryURL = `${baseURL}/api/search/${trackTitle}/${artistName}`;

        $.ajax({
            // Making an ajax call to our backend (search-routes.js)
            url: queryURL,
            method: "GET",
        }).then((response) => {
            console.log(response);
            const limit =
                // If less than five search results, takes the length of the response
                response.tracks.items.length < 5 ? response.tracks.items.length : 5;

            for (let i = 0; i < limit; i++) {
                const id = response.tracks.items[i].id;
                const title = response.tracks.items[i].name;
                const artist = response.tracks.items[i].artists[0].name;

                // Creating a div to house the iframe and button
                const songDiv = $("<div>")
                    .attr("id", `songDiv${i}`)
                    .appendTo(".results");

                // Dynamically creating the iframes for playback of results
                const song = $("<iframe>", {
                    src: `https://open.spotify.com/embed/track/${id}`,
                    id: id,
                    width: "300",
                    height: "80",
                    frameborder: "0",
                    allowtransparency: "true",
                    allow: "encrypted-media",
                }).appendTo(`#songDiv${i}`);

                // Dynamically creating the "Suggest" button with data attributes
                const suggest = $("<button>", {
                        text: "Suggest",
                    })
                    .addClass("suggest")
                    .attr("data-id", id)
                    .attr("data-title", title)
                    .attr("data-artist", artist)
                    .appendTo(`#songDiv${i}`);

                $("</br>").appendTo(".results");
            }
        });
    }
});