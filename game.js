var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var colors = ['#F49F0A', '#DD0808', '#0C7BD6', '#278C2E'];
var tcolors = ['#F08700', '#AD1616', '#003D70', '#004904'];
var words = ['orange', 'red', 'blue', 'green'];

var score = 0;
var penalty = 0;
var misses = 0;

// Allows for only one action per turn
var hitOnce = false;
// Boolean that determines whether action should be taken
var shouldTap = false;
// Check if game is started for Start/Stop Button
var gameStarted = false;

function draw(){
    canvas.className = '';
    randomColorIndex = Math.floor(Math.random()*colors.length);
    randomTextIndex = Math.floor(Math.random()*words.length);
    randomTextColorIndex = Math.floor(Math.random()*tcolors.length);
    var randomColor = colors[randomColorIndex];
    var randomText = words[randomTextIndex];
    var randomTextColor = tcolors[randomTextColorIndex];
    ctx.fillStyle = randomColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = randomTextColor;
    ctx.font = '5em arial';
    ctx.textAlign='center';
    ctx.fillText(randomText, 150, 100);
    ctx.strokeText(randomText, 150, 100);
    if (randomColorIndex === randomTextIndex) {
      shouldTap = true;
    } else {
      shouldTap = false;
    }
}

var button = document.querySelector('#button');

function buttonF() {
  if (gameStarted == false){
    startGame();
    gameStarted = true;
    button.innerText = "Stop Game";
  } else {
    endGame();
    gameStarted = false;
    button.innerText = 'Start Game';
  }
}

// Start and End Game //
////////////////////////

// Reference variable created in Startgame function and called in Endgame function
var refreshIntervalId;

function startGame() {
  score = 0;
  penalty = 0;
  misses = 0;
  hitOnce = false;
  gameOver.style.display = 'none';
    refreshIntervalId = setInterval(function(){
      hitOnce = false;
      updateScore();
      if (shouldTap == true){
        misses ++;
      }
      if (misses === 5){
        endGame();
      }
      updateScore();
      draw();
    }, 1000);
}

function stopGame() {
  endGame();
}

var gameOver = document.querySelector('.scoreSheet');
gameOver.style.display = 'none';

function endGame() {
  clearInterval(refreshIntervalId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.className = 'nocanvas';
  var scoreText = document.querySelector('.scoreSheet span');
  scoreText.innerText = score;
  gameOver.style.display = '';
  button.innerText = 'Start Game';
  gameStarted = false;
}

// Events //
////////////

document.onkeydown = function(e){
  if(e.code == 'KeyC'){
    hit();
  }
};

canvas.onclick = function(){
  hit();
};

function hit() {
  if (hitOnce){} else {
    if (true) {
      if (shouldTap) {
         score ++;
         shouldTap = false;
      } else {
        penalty ++;
        if (penalty === 5 ) {
          endGame();
        }
        updateScore();
      }
      hitOnce = true;
    }
  }
}

function updateScore() {
  document.getElementById('score').innerText = 'Score: ' + score;
  document.getElementById('penalty').innerText = 'Errors: ' + penalty + '/5';
  document.getElementById('misses').innerText = 'Misses: ' + misses + '/5';
}
