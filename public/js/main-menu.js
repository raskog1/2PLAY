$(document).ready(function () {
  //Same functions if user clicks on either text or media buttons. Might have to
  //remove marginTop animation so that the buttons move into the navbar
  initClick();

  function initClick() {
    $('.mediaText').on('click', function () {
      $('h2').fadeOut(700, function () {});

      $('.mediaButton').animate(
        {
          width: '50px',
          height: '50px',
          marginTop: '-=300px',
        },
        1500
      );
    });
    $('.mediaButton').on('click', function () {
      $('h2').fadeOut(700, function () {});

      var animation = $('.mediaButton').animate(
        {
          width: '50px',
          height: '50px',
          marginTop: '-=300px',
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
