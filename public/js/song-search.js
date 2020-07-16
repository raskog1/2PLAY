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
    const access_token =
      "BQDKsb3tDH0y6MgV1n8iM8IJOfPg32sm1D6HzQu08TCqX9uQJZXWBn6byWrWuxkFEyX9LNaJgQmg278EyHfG2r3RhWQH_GwXnv1O7JNr0GlIvCBYwflB2e__9VbOGFBHH5d3f1CnWLT9cA";

    let queryURL =
      "https://api.spotify.com/v1/search?q=" +
      trackTitle +
      "%20" +
      artist +
      "&type=track&market=US";

    $.ajax({
      url: queryURL,
      headers: {
        Authorization: "Bearer " + access_token,
      },
      method: "GET",
    }).then((response) => {
      // Get top five results from search, store in Express database
      for (let i = 0; i < 5; i++) {
        const song = {
          id: response.tracks.items[i].id,
          title: response.tracks.items[i].name,
          artist: response.tracks.items[i].artists[0].name,
        };

        $.post("/api/tracks", song, (data) => {
          console.log(
            `${song.title} by ${song.artist}, track ID is: ${song.id}`
          );
        });
      }
    });
  }
});
