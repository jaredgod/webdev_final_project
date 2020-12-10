
async function getHighScoreList(){
  var r = [];
  await fetch("/getHighScoreList", {
          method: 'POST'
  })
  .then(response => response.json())
  .then(function(response) {
    if (response.ok) {
      r = response.data;
      return r;
    }
    console.log("Could not load high score list.");
    return null;
  });

  return r;
}

document.querySelector('.dropdown').addEventListener('mouseenter', () => {
  var list = document.querySelector('#hsList');
  var post = [];
  var postContent = []
  console.log("here");
  update = false;
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  getHighScoreList().then(function(hsList){
    hsList.forEach((item, i) => {
      post.push(document.createElement("li"));
      postContent.push(document.createTextNode(item.name + " - " + item.score));
      post[i].appendChild(postContent[i]);
      list.appendChild(post[i]);
    });
  });

});
