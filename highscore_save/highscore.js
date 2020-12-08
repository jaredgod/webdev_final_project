
/*
returns an array of objects with a "highscore", "name", and "rank"
*/
function getHighScoreList(){
  var scores = require("highscore.json");
  var returnList = [];
  scores.forEach((item, i) => {
    returnList.push({
      rank: item.rank,
      name: item.name,
      score: item.score
    });
  });
  return returnList;
}

/*
will save a highscore to the highscore.json file.
*/
function addHighScore(name, score, pass=""){
  return;
}

/*
returns a single object with a "score", "name", and "rank" based on the name
*/
function getHighScore(name){
  var obj = {
    rank: 0,
    name: "",
    score: 0
  }
  return obj;
}


console.log(getHighScoreList());
