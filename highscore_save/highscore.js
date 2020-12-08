
/*
returns an array of objects with a "score", "name", and "rank"
*/
function getHighScoreList(){
<<<<<<< HEAD
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
=======
  var obj = {
    rank: 0,
    name: "",
    score: 0
  }
  return [obj];
>>>>>>> 4fa58c43433d7c6e3b67928b2bbe03b8b5ccc8fe
}

/*
will save a highscore to the highscore.json file. returns true if successful. returns false if not
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
