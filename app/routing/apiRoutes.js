
var friendsArray = require('../data/friends.js');

module.exports = function(app){

  app.get('/api/friends', function(req,res){
    res.json(friendsArray);
  });
  app.post('/api/friends', function (req, res) {
    // to compare the scores
    var newFriendScoreArray =req.body.scores;
    var scoresArray = [];
    var bestMatch = 0;
    var count = 0;
    // for current friend 
    for(var i=0; i<friendsArray.length; i++){
      var scoresDiff = 0;
// compare the friend with existing friend
      for(var j=0; j<newFriendScoreArray.length; j++){
        scoresDiff += (Math.abs(parseInt(friendsArray[i].scores[j]) - parseInt(newFriendScoreArray[j])));
      }
      // then add the json the user sent to the friendsData array 
      scoresArray.push(scoresDiff);
    }
     // find best match after comparision  with all friends
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }
    //return data
    var yourMatch = friendsArray[bestMatch];
    res.json(yourMatch);
    friendsArray.push(req.body);
});

};