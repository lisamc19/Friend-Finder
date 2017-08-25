var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var friends = require('./app/data/friends.js')
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
 var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

// app.get("/friends", function(req, res) {
//   res.sendFile(path.join(__dirname, "app/data/friends.js"));
// });

// Get all friends
app.get("/friends", function(req, res) {
  res.json(friends);
});

// Search for Specific friend (or all friends) - provides JSON
// app.get("/friends", function(req, res) {
//   var chosen = req.params.friends;

//   if (chosen) {
//     console.log(chosen);

//     for (var i = 0; i < friends.length; i++) {
//       if (chosen === friends[i].routeName) {
//         return res.json(friends[i]);
//       }
//     }
//     return res.json(false);
//   }
//   return res.json(friends);
// });

// Create New friends - takes in JSON input

app.post("/friends", function(req, res) {
  var newFriend = req.body;
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

  console.log(newFriend);

  friends.push(newFriend);

  res.json(newFriend);
  console.log(friends)
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
