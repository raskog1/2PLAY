$(document).ready(function () {

    //let access_token = "BQA1x7PGNhoY6u1yeV-3AW_bH7ZDop-TrLAUpL0pMYzo8sXdUsXx603j1Rss0N7sTqbX6E49zl6WLLR450jZGogjng7mH7A5CjlzRB17e3OeTBZnrQZ60a5zGHd7cwQTOyA09gUmUYWIjP3eyICEqhYJSE0KChbCOXVaPAvwaINPUTWn3w48BjtnOHo4leLJpjzCjf22DIQ";

    $("body").on("click", ".spotifyPush", function () {
        $.get(`/api/playlist/${getPlaylistID()}`, (listName) => {
            userIDForPush(listName);
        })
    })


    function getPlaylistID() {
        const url = window.location.search;
        if (url.indexOf("?playlist_id=") !== -1) {
            let currentPlaylist = url.split("=")[1];
            return currentPlaylist;
        }
    }

    var userIDForPush = function (listname) {

        $.get("/refresh_token", (token) => {
            console.log(token);

            $.ajax({
                url: "https://api.spotify.com/v1/me",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                type: "GET",
                success: function (data) {
                    user_id = data.id;
                    console.log(data);
                    console.log(user_id);

                    userPlaylistPush(user_id, listname, token);
                },
                error: function () {
                    alert("Cannot get data");
                }
            });
        })
    };

    var userPlaylistPush = function (user, name, token) {
        //  app.get("/refresh_token", function(req, res) {

        $.ajax({
            method: "POST",
            url: `https://api.spotify.com/v1/users/${user}/playlists`,
            data: JSON.stringify({ name: name, public: false }),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: function (data) {
                console.log(data);
                console.log(data.id);
                console.log("hello");
            },
            error: function () {
                alert("Cannot get data");
            }
        });
    }
})




