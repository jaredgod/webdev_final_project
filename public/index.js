//will save a highscore to the highscore.json file.
//password is optional, no password is "".
async function addHighScore(name, score, pass=""){

  var data = {
    name: name,
    score: score,
    pass: pass
  }

  fetch("/addHighScore", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(function(response) {
    if (!response.ok) {
      console.log("Could not add high score.");
      return false;
    }
    return true;
  });
}



//game
var numbats = 4;
var numpits = 4;
var numarrows = 2;
var sizeX = 5;
var sizeY = 5;
var playGame = true;
var points = 0;
var map = [[]];
var px = 0;
var py = 0;
var aCount = numarrows;
var devTest = true;


init();

//initialize the map
function init(){
  map = [[]];
  playGame = true;
  points = 0;
  updateArrows(numarrows);
  for(var x = 0; x < sizeX; x++){
    map[0].push({
      back: "",//s,p
      fore: ""//0,c,b,w
    });
  }
  for(var y = 1; y < sizeY; y++){
    var row = []
    for(var x = 0; x < sizeX; x++){
      row.push({
        back: "",//s,p
        fore: ""//0,c,b,w,a
      });
    }
    map.push(row);
  }
  for(var y = 0; y < sizeY; y++){
    for(var x = 0; x < sizeX; x++){
      replaceBack(x, y, "s");
      replaceFore(x, y, "0");
    }
  }




  for(var i = 0; i < numbats; i++){
    var done = false;
    while(!done){
      var x = Math.floor(Math.random() * 5);
      var y = Math.floor(Math.random() * 5);
      if(map[x][y].fore == '0'){
        replaceFore(x, y, 'b');
        done = true;
      }
    }
  }

  for(var i = 0; i < numpits; i++){
    var done = false;
    while(!done){
      var x = Math.floor(Math.random() * 5);
      var y = Math.floor(Math.random() * 5);
      if(map[x][y].back == 's' && map[x][y].fore == '0'){
        replaceBack(x, y, 'p');
        done = true;
      }
    }
  }

  if(true){
    var done = false;
    while(!done){
      var x = Math.floor(Math.random() * 5);
      var y = Math.floor(Math.random() * 5);
      if(map[x][y].back == 's' && map[x][y].fore == '0'){
        replaceFore(x, y, 'w');
        done = true;
      }
    }
  }



  //initialize player

  if(true){
    var done = false;
    while(!done){
      var x = Math.floor(Math.random() * 5);
      var y = Math.floor(Math.random() * 5);
      if(map[x][y].back == 's' && map[x][y].fore == '0'){
        replaceFore(x, y, 'c');
        done = true;
        px = x;
        py = y;
      }
    }
  }



  percieve();
  if(devTest) printMap();//test-----------
}

//map functions


function printMap(){
  var print = "";
  for(var y = 0; y < sizeY; y++){
    for(var x = 0; x < sizeX; x++){
      print += "[" + map[x][y].fore + "" + map[x][y].back + "]"
    }
    print += '\n';
  }
  console.log(print);
}

function inRange(x, y){
  return 0 <= x && x < sizeX && 0 <= y && y < sizeY;
}

//player movement and shooting functions


function percieve(){
  var percieveX = px;
  var percieveY = py + 1;
  if(inRange(percieveX, percieveY)){
    if(map[percieveX][percieveY].fore == 'b') printMessage("you hear flapping");
    if(map[percieveX][percieveY].fore == 'w') printMessage("you smell something rotting");
    if(map[percieveX][percieveY].back == 'p') printMessage("you feel a breeze");
  }

  percieveX = px + 1;
  percieveY = py;
  if(inRange(percieveX, percieveY)){
    if(map[percieveX][percieveY].fore == 'b') printMessage("you hear flapping");
    if(map[percieveX][percieveY].fore == 'w') printMessage("you smell something rotting");
    if(map[percieveX][percieveY].back == 'p') printMessage("you feel a breeze");
  }

  percieveX = px;
  percieveY = py - 1;
  if(inRange(percieveX, percieveY)){
    if(map[percieveX][percieveY].fore == 'b') printMessage("you hear flapping");
    if(map[percieveX][percieveY].fore == 'w') printMessage("you smell something rotting");
    if(map[percieveX][percieveY].back == 'p') printMessage("you feel a breeze");
  }

  percieveX = px - 1;
  percieveY = py;
  if(inRange(percieveX, percieveY)){
    if(map[percieveX][percieveY].fore == 'b') printMessage("you hear flapping");
    if(map[percieveX][percieveY].fore == 'w') printMessage("you smell something rotting");
    if(map[percieveX][percieveY].back == 'p') printMessage("you feel a breeze");
  }
}

function movePlayer(x, y){
  if(inRange(px + x, py + y)){
    replaceFore(px, py, '0');
    points += 1;
    px += x;
    py += y
    if(map[px][py].fore == 'b'){
      printMessage("you get picked up by a swarm of bats and land somewhere in the cave...");
      var dx = Math.floor(Math.random() * 3)-1;
      var dy = Math.floor(Math.random() * 3)-1;
      movePlayer(dx, dy);
    }
    else
    if(map[px][py].fore == 'w'){
      printMessage("you found the wumpus, and the wumpus found you...");
      gameOver()
    }
    else
    if(map[px][py].back == 'p'){
      printMessage("you fell down a hole...");
      gameOver()
    }
    else{
      replaceFore(px, py, 'c');
      percieve();
      if(devTest)printMap();
    }
  }
}

function shoot(x, y){
  if(aCount > 0){
    points += 1;
    updateArrows(aCount-1);
    for(var i = px; x != 0 && i >= 0 && i < sizeX; i += x){
      if(map[i][py].fore == 'w'){
        youWin();
      }
    }
    for(var i = py; y != 0 && i >= 0 && i < sizeY; i += y){
      if(map[i][py].fore == 'w'){
        youWin();
      }
    }
  }
}

window.addEventListener("keydown", function (event) {
  if(playGame){
    var key = event.key;
    if(key == 'w'){
      movePlayer(0, -1);
    }
    if(key == 'a'){
      movePlayer(-1, 0);
    }
    if(key == 's'){
      movePlayer(0, 1);
    }
    if(key == 'd'){
      movePlayer(1, 0);
    }
    if(key == 'W'){
      shoot(0, -1);
    }
    if(key == 'A'){
      shoot(-1, 0);
    }
    if(key == 'S'){
      shoot(0, 1);
    }
    if(key == 'D'){
      shoot(1, 0);
    }
  }
});

//IO functions
function gameOver(){
playGame = false;
  //your lose function
}

function youWin(){
playGame = false;
  //your win function
}

function printMessage(m){
  if(devTest) console.log(m);
  else{
    //your printmessage function
  }
}

function replaceBack(x, y, back){
  if(inRange(x, y)){
    map[x][y].back = back;
    //your replacebackground function
  }
  else if(devTest) console.log("Error: replaceBack out of bounds: " + x + " " + y);
}

function replaceFore(x, y, fore){
  if(inRange(x, y)) {
    map[x][y].fore = fore;
    //your replaceforeground function
  }
  else if(devTest) console.log("Error: replaceFore out of bounds: " + x + " " + y);
}

function updateArrows(n){
  aCount = n;
  //your update arrows function
}

//make sure your restart function calls my init function
