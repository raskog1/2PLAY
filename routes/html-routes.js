const router = require("express").Router();
const path = require("path");

require("dotenv").config();

const isAuthenticated = require("../config/middleware/isAuthenticated");

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/landing.html"));
});

router.get("/rooms", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/rooms.html"));
});

router.get("/signup", (req, res) => {
  if (req.user) {
    res.redirect("/main");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/roomLogin", (req, res) => {
  if (req.user) {
    res.redirect("/main");
  }
  res.sendFile(path.join(__dirname, "../public/roomLogin.html"));
});

router.get("/main", isAuthenticated, (req, res) => {
  res.render("mainMenu", {
    style: "styleMainMenu.css",
  });
});

router.get("/new", (req, res) => {
  res.render("new", {
    style: "styleNew.css",
  });
});

router.get("/existing", (req, res) => {
  res.render("existing", {
    style: "styleExisting.css",
  });
});

router.get("/incomplete", (req, res) => {
  res.render("incomplete", {
    style: "styleIncomplete.css",
  });
});

router.get("/complete", (req, res) => {
  res.render("complete", {
    style: "styleComplete.css",
  });
});

// module.exports = function (app) {
//   // landing route loads landing.html
//   app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/landing.html"));
//   });

//   app.get("/rooms", (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/rooms.html"));
//   });

//   app.get("/signup", (req, res) => {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/main");
//     }
//     res.sendFile(path.join(__dirname, "../public/signup.html"));
//   });

//   app.get("/roomLogin", (req, res) => {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/main");
//     }
//     res.sendFile(path.join(__dirname, "../public/roomLogin.html"));
//   });

//   // Here we've add our isAuthenticated middleware to this route.
//   // If a user who is not logged in tries to access this route they will be redirected to the signup page
//   app.get("/main", isAuthenticated, (req, res) => {
//     res.render("mainMenu", {
//       style: "styleMainMenu.css",
//     });
//   });

//   app.get("/new", function (req, res) {
//     res.render("new", {
//       style: "styleNew.css",
//     });
//   });

//   app.get("/existing", function (req, res) {
//     res.render("existing", {
//       style: "styleExisting.css",
//     });
//   });

//   app.get("/incomplete", function (req, res) {
//     res.render("incomplete", {
//       style: "styleIncomplete.css",
//     });
//   });

//   app.get("/complete", function (req, res) {
//     res.render("complete", {
//       style: "styleComplete.css",
//     });
//   });

//   // app.get("/*", (req, res) => {
//   //   res.sendFile(path.join(__dirname, "../public/landing.html"));
//   // });
// };
const request = require("request"); // "Request" library
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

var redirect_uri = process.env.redirect_uri;

var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

router.use(cors()).use(cookieParser());

router.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  var scope =
    "user-read-private user-read-email playlist-modify-private playlist-modify-public";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

router.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  console.log(req.cookies);

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;
        res.cookie("spotifyAccessToken", body.access_token);

        // var options = {
        //   url: "https://api.spotify.com/v1/me",
        //   headers: { Authorization: "Bearer " + access_token },
        //   json: true,
        // };

        // // use the access token to access the Spotify Web API
        // request.get(options, function (error, response, body) {
        //   console.log(body);
        // });

        // // we can also pass the token to the browser to make requests from there
        // res.redirect(
        //   "/#" +
        //   querystring.stringify({
        //     access_token: access_token,
        //     refresh_token: refresh_token,
        //   })

        // );
        res.redirect("/rooms");
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
  // res.cookie(spotifyAccessToken, body.access_token);
});

router.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

module.exports = router;
