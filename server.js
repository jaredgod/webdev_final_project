

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var hs = require("./public/highscore.js");

var p = parseInt(process.argv.slice(2));
if(!p){
  console.log("use port as parameter");
  return;
}


var app = express();
var port = process.env.PORT || p;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.status(200).render('game');
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.post("/getHighScoreList", (req, res) => {
  res.status(200).json({
      ok: true,
      data: hs.getHighScoreList()
  });
});

app.put("/addHighScore", (req, res) => {
  hs.addHighScore(req.body.name, req.body.score, req.body.pass)
  res.status(200).json({
      ok: true
  });
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
