
$(document).ready(function () {
  initClick();
    function initClick() {
        $('.mediaText').on('click', function() {
            $('h2').fadeOut(600, function() {});


      $('.mediaButton').delay(800).animate(
        {
          width: '50px',
          height: '50px',
          marginTop: '-=530px',
        },
        1500
      );
    });
    $('.mediaButton').on('click', function () {
      $('h2').fadeOut(700, function () {});

      var animation = $('.mediaButton').delay(800).animate(
        {
          width: '50px',
          height: '50px',
          marginTop: '-=530px',
        },
        1500
      );

      animation.off('click');
    });
  }
  //event handlers for New Playlist, Edit Playlists, View Playlists
  var newPlaylistContent = $('#mediaButton1').on('click', function () {
    return true;
  });
  var editPlaylistContent = $('#mediaButton2').on('click', function () {
    return true;
  });
  var viewPlaylistContent = $('#mediaButton3').on('click', function () {
    return true;
  });
});
