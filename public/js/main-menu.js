$(document).ready(function() {
    //event handlers for New Playlist, Edit Playlists, View Playlists
    initClick();

    function initClick() {
        $('.mediaText').on('click', function() {
            $('h2').fadeOut(600, function() {});
            $('.mediaButton').delay(800).animate({
                    width: '50px',
                    height: '50px',
                    marginTop: '-=530px',
                },
                1500
            );
        });

        $('#mediaButton1').on('click', function() {
            $('h2').fadeOut(700, function() {});
            var animation = $('.mediaButton').delay(800).animate({
                    width: '50px',
                    height: '50px',
                    marginTop: '-=530px',
                },
                1500
            );
            animation.off('click');
            setTimeout(function() {
                window.location.href = '/new';
            }, 3100);
        });
        $('#mediaButton2').on('click', function() {
            $('h2').fadeOut(700, function() {});
            var animation = $('.mediaButton').delay(800).animate({
                    width: '50px',
                    height: '50px',
                    marginTop: '-=530px',
                },
                1500
            );
            animation.off('click');
            setTimeout(function() {
                window.location.href = '/incomplete';
            }, 3100);
        });
        $('#mediaButton3').on('click', function() {
            $('h2').fadeOut(700, function() {});
            var animation = $('.mediaButton').delay(800).animate({
                    width: '50px',
                    height: '50px',
                    marginTop: '-=530px',
                },
                1500
            );
            animation.off('click');
            setTimeout(function() {
                window.location.href = '/complete';
            }, 3100);
        });
    }
});