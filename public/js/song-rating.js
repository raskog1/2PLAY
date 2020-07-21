$(document).ready(() => {
  $("body").on("click", ".rateIt", function(event) {
    event.preventDefault();

    let score = $(event.target)
      .parent()
      .find("input")
      .val();
    let songId = $(this).data("id");
    let user = $(this)
      .parent()
      .parent()
      .data("user");

    console.log(user);

    rateSong(user, songId, score);

    function rateSong(user, songId, score) {
      if (user === "pilot") {
        const ratingData = {
          id: songId,
          pilot_rating: score,
        };
        $.ajax({
          method: "PUT",
          url: "/api/songs",
          data: ratingData,
        }).then(function() {
          window.location.reload();
        });
      } else if (user === "coPilot") {
        const ratingData = {
          id: songId,
          copilot_rating: score,
        };
        $.ajax({
          method: "PUT",
          url: "/api/songs",
          data: ratingData,
        }).then(function() {
          window.location.reload();
        });
      }
    }
  });
});
