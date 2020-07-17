$(document).ready(() => {
  $("#search").on("click", function(event) {
    event.preventDefault();

    const track = $("#songSearchInput")
      .val()
      .trim();
    const artist = $("#artistSearchInput")
      .val()
      .trim();

    searchHandle(track, artist);
  });

  // Need to find a way to dynamically feed in refreshed access_token
  // This searches based on title and/or artist
  function searchHandle(trackTitle, artist) {
    const baseURL = "http://localhost:8080";
    const queryURL = `${baseURL}/api/search/${trackTitle}/${artist}`;

    $.ajax({
      //making an ajax call to our backend
      url: queryURL,
      method: "GET",
    }).then((response) => {
      console.log(response);
      const limit =
        // If less than five items, takes length of response
        response.tracks.items.length < 5 ? response.tracks.items.length : 5;

      for (let i = 0; i < limit; i++) {
        const id = response.tracks.items[i].id;
        const title = response.tracks.items[i].name;
        const artist = response.tracks.items[i].artists[0].name;

        const song = $("<iframe>", {
          src: `https://open.spotify.com/embed/track/${id}`,
          id: id,
          width: "300",
          height: "80",
          frameborder: "0",
          allowtransparency: "true",
          allow: "encrypted-media",
        }).appendTo(".results");

        $("</br>").appendTo(".results");

        // Need to clear the div each time a new search is executed.
      }
    });
  }
});
