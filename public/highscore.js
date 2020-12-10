module.exports = {
  /*
  returns an array of objects with a "highscore", "name", and "rank"
  */
  getHighScoreList: function (){
    var scores = require("./highscore.json");
    var returnList = [];
    scores.forEach((item, i) => {
      returnList.push({
        rank: i,
        name: item.name,
        score: item.score
      });
    });
    return returnList;
  },

  /*
  will save a highscore to the highscore.json file.
  */
  addHighScore: function (name, score, pass=""){
    var scores = require("./highscore.json");
    const fs = require('fs');
    var path = require('path');
    var updated = false;
    scores.forEach((item, i) => {
      if(item.name == name){
        if(item.pass != pass){
          return false;
        }
        else{
          if(item.score <= score){
            item.score = score;
            updated = true;
            var pos = i;
            while(pos > 0 && scores[pos].score > scores[pos-1].score){
              var temp = scores[pos];
              scores[pos] = scores[pos-1];
              scores[pos-1] = temp;
              pos--;
            }
          }
        }
      }
    });
    if(!updated){
      scores.push({
        name: name,
        pass: pass,
        score: score
      });
      pos = scores.length-1;
      if(pos>0){
        while(pos > 0 && scores[pos].score > scores[pos-1].score){
          var temp = scores[pos];
          scores[pos] = scores[pos-1];
          scores[pos-1] = temp;
          pos--;
        }
      }
    }
    fs.writeFileSync(path.resolve(__dirname, 'highscore.json'), JSON.stringify(scores));
  }
}
