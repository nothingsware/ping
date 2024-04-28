var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var startBtn = document.getElementById("start-btn");
var pauseBtn = document.getElementById("pause-btn");
var restartBtn = document.getElementById("restart-btn");
var animationId;
var gameRunning = false;

startBtn.addEventListener("click", function() {
  if (!gameRunning) { // only start the game if gameRunning is false
    gameRunning = true; 
    loop();
  }
});

pauseBtn.addEventListener("click", function() {
  gameRunning = false;
  cancelAnimationFrame(animationId);
});

restartBtn.addEventListener("click", function() {
  document.location.reload();
});

addEventListener("load", (event) => {
  draw();
});



// Define ball properties
var ballRadius = 7;
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballSpeedX = 7;
var ballSpeedY = 7;

// Define paddle properties
var paddleHeight = 80;
var paddleWidth = 15;
var leftPaddleY = canvas.height / 2 - paddleHeight / 2;
var rightPaddleY = canvas.height / 2 - paddleHeight / 2;
var paddleSpeed = 10;

function drawPaddles() {
  // Left paddle
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(10, leftPaddleY, paddleWidth, paddleHeight);
  // Right paddle
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(canvas.width - paddleWidth - 10, rightPaddleY, paddleWidth, paddleHeight);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw paddles
  drawPaddles();
  // Draw other elements (ball, center line, scores, etc.)
  // ...
}

// Define score properties
var leftPlayerScore = 0;
var rightPlayerScore = 0;
var maxScore = 15;

// Listen for keyboard events
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
// Handle key press
var upPressed = false;
var downPressed = false;
let wPressed = false;
let sPressed = false;

function keyDownHandler(e) {
  if (e.key === "ArrowUp") {
    upPressed = true;
  } else if (e.key === "ArrowDown") {
    downPressed = true;
  } else if (e.key === "w") {
    wPressed = true;
  } else if (e.key === "s") {
    sPressed = true;
  }
}

// Handle key release
function keyUpHandler(e) {
  if (e.key === "ArrowUp") {
    upPressed = false;
  } else if (e.key === "ArrowDown") {
    downPressed = false;
  } else if (e.key === "w") {
    wPressed = false;
  } else if (e.key === "s") {
    sPressed = false;
  }
}


function update() {
 

  if (upPressed && rightPaddleY > 0) {
    rightPaddleY -= paddleSpeed;
  } else if (downPressed && rightPaddleY + paddleHeight < canvas.height) {
    rightPaddleY += paddleSpeed;
  }


  if (wPressed && leftPaddleY > 0) {
    leftPaddleY -= paddleSpeed;
  } else if (sPressed && leftPaddleY + paddleHeight < canvas.height) {
    leftPaddleY += paddleSpeed;
  }


  ballX += ballSpeedX;
  ballY += ballSpeedY;


  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }


  if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }


  if (ballX < 0) {
    rightPlayerScore++;
    reset();
  } else if (ballX > canvas.width) {
    leftPlayerScore++;
    reset();
  }


  if (leftPlayerScore === maxScore) {
    playerWin("Left player");
  } else if (rightPlayerScore === maxScore) {
    playerWin("Right player");
  }
}

function playerWin(player) {
  var message = "Congratulations! " + player + " win!";
  $('#message').text(message); 
  $('#message-modal').modal('show'); 
  reset();
}


function reset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = Math.random() * 7 - 5;

}


function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#FFF";
  ctx.font = "15px Arial";

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = "#FFF"; 
  ctx.stroke();
  ctx.closePath();


  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

 
  ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);


  ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

  ctx.fillText("Score: " + leftPlayerScore, 10, 20);
  ctx.fillText("Score: " + rightPlayerScore, canvas.width - 70, 20);
}


function loop() {
  update();
  draw();
  animationId = requestAnimationFrame(loop);
}

$('#message-modal-close').on('click', function() {
  document.location.reload();
});
