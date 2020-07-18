<<<<<<< HEAD
$(document).ready(function () {
  initClick();
=======
$(document).ready(function() {
    initClick();
>>>>>>> 1e6af57ea0f16ff9172e278684643cff536ab684

    function initClick() {
        $('.mediaText').on('click', function() {
            $('h2').fadeOut(600, function() {});

<<<<<<< HEAD
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
=======
            var animation = $('.mediaButton').delay(800).animate({
                    width: '50px',
                    height: '50px',
                    marginTop: '-=530px',
                    position: 'absolute',
                },
                1500
            );
            animation.off('click');
        });
        $('.mediaButton').on('click', function() {
            $('h2').fadeOut(600, function() {});

            var animation = $('.mediaButton').delay(800).animate({
                    width: '50px',
                    height: '50px',
                    marginTop: '-=530px',
                    position: 'absolute',
                },
                1500
            );
            animation.off('click');
        });
    }
    //event handlers for New Playlist, Edit Playlists, View Playlists
    $('#mediaButton1').on('click', function() {});
    $('#mediaButton2').on('click', function() {});
    $('#mediaButton3').on('click', function() {});
});
>>>>>>> 1e6af57ea0f16ff9172e278684643cff536ab684
