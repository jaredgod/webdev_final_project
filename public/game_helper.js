var globalFeed = document.getElementById('feed-list').innerHTML;
var image = document.querySelectorAll("#layer1")
var recentScore = 0;

function replaceImage(x, y, input){

  if(input === 's'){
    image[y * 5 + x].src = '/Pixel art for CS 290/rocks1.png';
  }
  if(input === '0'){
    image[y * 5 + x].src = '/Pixel art for CS 290/rocks1.png';
  }
  if(input === 'p'){
    image[y * 5 + x].src = '/Pixel art for CS 290/rocks1.png';
  }
  if(input === 'w'){
    image[y * 5 + x].src = '/Pixel art for CS 290/rocks1.png';
  }
  if(input === 'b'){
    image[y * 5 + x].src = '/Pixel art for CS 290/rocks1.png';
  }
  if(input === 'c'){
    image[y * 5 + x].src = '/Pixel art for CS 290/player.png';
  }
}

function printmessage(str){

    var feedList = document.getElementById("feed-list");
    feedList.innerHTML = globalFeed;
    var newMessage = document.createElement('li');
    newMessage.classList.add("feed-text");
    var text = document.createTextNode(str);
    newMessage.appendChild(text);
    feedList.appendChild(newMessage);
}

function resetMessage(){
  var feedList = document.getElementById("feed-list");
  while (feedList.hasChildNodes()) {
    feedList.removeChild(feedList.firstChild);
  }
}

function win(score){
  //displays a win screen with the score, get name and password
  var str = "Congratulation you won!"
  printmessage(str);
  recentScore = score;

  var modalBackdrop = document.getElementById("modal-backdrop");
  var postBackdrop = document.getElementById("add-post-modal");

  modalBackdrop.classList.remove("hidden");
  postBackdrop.classList.remove("hidden");
}

function updateArrows(n){
  //changes the amount of arrows on the screen
  var container = document.getElementsByClassName('arrow-container')[0];
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }

  for(var i = 0; i < n; i++){
    var child = document.createElement("img");
    child.src = "/Pixel art for CS 290/arrowright.png";
    child.id = "arrow";
    child.class = 'game-image';
    container.appendChild(child);
  }
}
