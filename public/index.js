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
