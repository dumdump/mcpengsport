var whichKeyPressed;
var buttonE = document.getElementById("e-button");
var buttonQ = document.getElementById('q-button');
var gameCanvas;
var game;
var speed = 10;
var bulletSpeed = 50;
var characterPosX = 0;
var characterPosY = 0;
var bulletPosX = 0;
var bulletPosY = 0;
var shotAvailable = true;

const pause = time => new Promise(resolve => setTimeout(resolve, time))

function draw() {
  gameCanvas = document.getElementById('game');
  game = gameCanvas.getContext('2d');
  characterPosX = 150;
  characterPosY = 125;

  game.fillStyle = "red";
  game.fillRect(characterPosX, characterPosY, 50, 50);

  game.fillStyle = "gray";
  game.fillRect(0, 0, 40, gameCanvas.height);
}

function help() {
  var helpButton = document.getElementById('help');
}

function leftKeyPressed() {
  console.log("left key is pressed.");
  if (characterPosX > 70) {
    game.fillStyle = "red";
    game.clearRect(characterPosX + speed, characterPosY, 50, 50);
    characterPosX -= speed;
    game.fillRect(characterPosX, characterPosY, 50, 50);
  }
}

function upKeyPressed() {
  console.log("up key is pressed.");
  if (characterPosY > 0) {
    game.fillStyle = "red";
    game.clearRect(characterPosX, characterPosY + speed, 50, 50);
    characterPosY -= speed;
    game.fillRect(characterPosX, characterPosY, 50, 50);
  }
}

function rightKeyPressed() {
  console.log("right key is pressed.");
  game.fillStyle = "red";
  game.clearRect(characterPosX - speed, characterPosY, 50, 50);
  characterPosX += speed;
  game.fillRect(characterPosX, characterPosY, 50, 50);
}

function downKeyPressed() {
  console.log("down key is pressed.");
  if (characterPosY < 250) {
    game.fillStyle = "red";
    game.clearRect(characterPosX, characterPosY - speed, 50, 50);
    characterPosY += speed;
    game.fillRect(characterPosX, characterPosY, 50, 50);
  }
}

async function eKeyPressed() {
  shotAvailable = false;
  console.log("e key is pressed");
  game.fillStyle = "orange";
  bulletPosX = characterPosX + 50;
  bulletPosY = characterPosY + 25;
  game.fillRect(bulletPosX, bulletPosY, 20, 5);
  while (bulletPosX < 1000) {
    game.clearRect(bulletPosX, bulletPosY, 20, 5);
    bulletPosX += bulletSpeed;
    game.fillStyle = "orange";
    game.fillRect(bulletPosX, bulletPosY, 20, 5);
    await pause(50).then(console.log('jaklsdfjlkasdfj'));
    console.log(bulletPosX);
  }
  shotAvailable = true;
}

function qKeyPressed() {
  console.log("q key is pressed");
}

function keyPressed(e) {
  if (e.code == "KeyA") {
    leftKeyPressed();
  } else if (e.code == "KeyW") {
    upKeyPressed();
  } else if (e.code == "KeyD") {
    rightKeyPressed();
  } else if (e.code == "KeyS") {
    downKeyPressed();
  } else if (e.code == "KeyE" && shotAvailable == true) {
    eKeyPressed();
  } else if (e.code == "KeyQ"){
    qKeyPressed();
  } else {}
}

function buttonEPressed() {
  if (shotAvailable == true) {
    eKeyPressed();
  }
}

document.addEventListener('keypress', keyPressed);
console.log(buttonE);
