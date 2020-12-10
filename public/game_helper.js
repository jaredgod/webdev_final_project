var globalFeed = document.getElementById('feed-list').innerHTML;

var winButton = document.getElementById("modal-accept");
winButton.addEventListener('click', hideBackdrop);

function replaceforeground(input){
  if(input === '0'){
    document.getElementById('layer2').src = '';
  }
  if(input === 'b'){
    document.getElementById('layer2').src = '/Pixel art for CS 290/bats (2).gif';
  }
  if(input === 'c'){
    document.getElementById('layer2').src = '/Pixel art for CS 290/player.png';
  }
  if(input === 'a'){
    document.getElementById('layer2').src = '/Pixel art for CS 290/arrowright.png';
  }
  if(input === 'w'){
    document.getElementById('layer2').src = '/Pixel art for CS 290/claws.gif';
  }
}

function replacebackground(input){
  if(input === 's'){
    document.getElementById('layer1').src = '/Pixel art for CS 290/rocks1.png';
  }
  if(input === 'p'){
    document.getElementById('layer1').src = '/Pixel art for CS 290/pitfall.gif';
  }
}

function printmessage(str){
    var feedList = document.getElementById("feed-list");
    feedlList.innerHTML = globalFeed;
    var newMessage = document.createElement('li');
    newMessage.classList.add("feed-text");
    var text = document.createTextNode(str);
    newMessage.appendChild(text);
    feedList.appendChild(newMessage);
}

function restart(){
  //calls init() function from index.js
  init();
}

function win(score){
  //displays a win screen with the score, get name and password
  var str = "Congratulation you won!"
  printmessage(str);

  var modalBackdrop = document.getElementById("modal-backdrop");
  var postBackdrop = document.getElementById("add-post-modal");

  modalBackdrop.classList.remove("hidden");
  postBackdrop.classList.remove("hidden");
}

function hideBackdrop(event){

  var modalBackdrop = document.getElementById("modal-backdrop");
  var postBackdrop = document.getElementById("add-post-modal");

  modalBackdrop.classList.add("hidden");
  postBackdrop.classList.add("hidden");

  var name = document.getElementById('post-text-input').value;
  var password = document.getElementById('password-input').value;
  addHighScore(name, score, password);
}

function updateArrows(){
  //changes the amount of arrows on the screen
  var container = document.getElementsByClassName('arrow-container')[0];

  if(container.children.length > 0){
    container.lastElementChild.remove();
  }
}
