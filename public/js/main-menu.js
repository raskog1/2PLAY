$(document).ready(function () {
  initClick();

  function initClick() {
    $('.mediaText').on('click', function () {
      $('h2').fadeOut(700, function () {});

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
  $('#mediaButton1').on('click', function () {});
  $('#mediaButton2').on('click', function () {});
  $('#mediaButton3').on('click', function () {});
});
