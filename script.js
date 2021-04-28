//variables
//game
var whichKeyPressed;
var buttonE = document.getElementById('e-button');;
var buttonQ;
var gameCanvas;
var game;
var timerScore = 0;
var baseHealth = 100;
var difficulty = 1;
var baseHealthEl = document.getElementById('base-health');
var timerScoreEl = document.getElementById('timer-score');
var difficultyEl = document.getElementById('level');
var healAvailablEl = document.getElementById('heal-available');
//chracter
var speed = 10;
var bulletSpeed = 10;
var characterPosX = 0;
var characterPosY = 0;
var characterDimensionW;
var characterDimensionH;
var bulletPosX = 0;
var bulletPosY = 0;
var shotAvailable = true;
var shooting = false;
var healAvailable = false;
//zombie
var zombieSpeed;
var zombieDimemsionW;
var zombieDimensionH;
var zombiePosX;
var zombiePosY;
var zombieHit = false;
var zombieIsShot = false;
var zombieHitStructure = false;
var zombieScore = 0;
var zombieCount = 0;

const pause = time => new Promise(resolve => setTimeout(resolve, time))

//constructers
function Character(speed, bulletSpeed, width, height) {
  this.speed = speed;
  this.bulletSpeed = bulletSpeed;
  this.width = characterDimensionW;
  this.height = characterDimenionH;
}
function Zombie(speed, width, height, posX, posY) {
  this.speed = speed;
  this.width = width;
  this.height = height;
  this.posX = posX;
  this.posY = posY;
}
function RandomNumber(max) {
  return Math.floor(Math.random() * max);
}
//functions
function draw() {
  gameCanvas = document.getElementById('game');
  game = gameCanvas.getContext('2d');
  characterPosX = 150;
  characterPosY = 125;

  game.fillStyle = "red";
  game.fillRect(characterPosX, characterPosY, 50, 50);

  game.fillStyle = "gray";
  game.fillRect(0, 0, 40, gameCanvas.height);

  setTimeout(startGameTimer, 1000);
  setTimeout(spawnZombie, 1000);
}

function createZombie() {
  newZombie = new Zombie(RandomNumber(50), 40, 40, 700, RandomNumber(200)+50);
}

async function spawnZombie() {
  zombieHit = false;
  createZombie();
  game.fillStyle = "green";
  zombiePosX = newZombie.posX;
  zombiePosY = newZombie.posY;
  zombieDimensionW = newZombie.width;
  zombieDimensionH = newZombie.height;
  zombieSpeed = newZombie.speed;
  game.fillRect(zombiePosX, zombiePosY, zombieDimensionW, zombieDimensionH);
  while (zombiePosX > 40 && zombieHit == false) {
    testZombieCollision();
    game.clearRect(zombiePosX, zombiePosY, zombieDimensionW, zombieDimensionH);
    zombiePosX -= difficulty*2;
    game.fillStyle = "green";
    game.fillRect(zombiePosX, zombiePosY, zombieDimensionW, zombieDimensionH);
    await pause(zombieSpeed);
  }
  await pause(500);
  game.clearRect(zombiePosX, zombiePosY, zombieDimensionW, zombieDimensionH);
  zombieLoop();
}

function zombieLoop() {
  game.fillStyle = "gray";
  game.fillRect(0, 0, 40, gameCanvas.height);
  console.log(zombiePosX);
  if (zombiePosX == 40) {
    baseHealth -= RandomNumber(25);
    baseHealthEl.innerHTML = "McPeng Sports Health: " + baseHealth + "%";
  }
  if (zombieScore == 10) {
    difficulty++;
    zombieScore = 0;
    difficultyEl.innerHTML = "Level: " + difficulty;
    healAvailable = true;
    healAvailableEl.innerHTML = "Heal Available: Yes";
  }
  if (baseHealth <= 0) {
    alert("McPeng Sports has fallen... " + "Time Alive: " + timerScore);
  } else {
    spawnZombie();
  }
}

function testZombieCollision() {
  var zombieCoordsYMax = zombiePosY + zombieDimensionH;
  if (bulletPosY > zombiePosY && bulletPosY < zombieCoordsYMax && characterPosX < zombiePosX && shooting == true) {
    zombieHit = true;
    zombieCount++;
    zombieScore++;
    timerScoreEl.innerHTML = "Zombies Slayed: " + zombieCount;
  }
}

function help() {
  var helpButton = document.getElementById('help');
}

function leftKeyPressed() {
  if (characterPosX > 70) {
    game.fillStyle = "red";
    game.clearRect(characterPosX + speed, characterPosY, 50, 50);
    characterPosX -= speed;
    game.fillRect(characterPosX, characterPosY, 50, 50);
  }
}

function upKeyPressed() {
  if (characterPosY > 0) {
    game.fillStyle = "red";
    game.clearRect(characterPosX, characterPosY + speed, 50, 50);
    characterPosY -= speed;
    game.fillRect(characterPosX, characterPosY, 50, 50);
  }
}

function rightKeyPressed() {
  game.fillStyle = "red";
  game.clearRect(characterPosX - speed, characterPosY, 50, 50);
  characterPosX += speed;
  game.fillRect(characterPosX, characterPosY, 50, 50);
}

function downKeyPressed() {
  if (characterPosY < 250) {
    game.fillStyle = "red";
    game.clearRect(characterPosX, characterPosY - speed, 50, 50);
    characterPosY += speed;
    game.fillRect(characterPosX, characterPosY, 50, 50);
  }
}

async function eKeyPressed() {
  shooting = true;
  shotAvailable = false;
  game.fillStyle = "orange";
  bulletPosX = characterPosX + 50;
  bulletPosY = characterPosY + 25;
  game.fillRect(bulletPosX, bulletPosY, 20, 5);
  while (bulletPosX < 1000) {
    game.clearRect(bulletPosX, bulletPosY, 20, 5);
    bulletPosX += 20;
    game.fillStyle = "orange";
    game.fillRect(bulletPosX, bulletPosY, 20, 5);
    await pause(bulletSpeed);
  }
  shotAvailable = true;
  shooting = false;
}

function qKeyPressed() {
  if (healAvailable == true) {
    baseHealth += RandomNumber(20);
    healAvailable = false;
    healAvailableEl.innerHTML = "Heal Available: No";
  }
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
  console.log("e button pressed")
  if (shotAvailable == true) {
    eKeyPressed();
  }
}

function startGameTimer() {
  setInterval(function() {
    timerScore += 1;
    console.log(timerScore);
  }, 1000)
}

//listeners
document.addEventListener('keypress', keyPressed);
buttonE.addEventListener('click', buttonEPressed);
baseHealthEl.innerHTML = "McPeng Sports Health: 100%";
difficultyEl.innerHTML = "Level: 1";
healAvailableEl.innerHTML = "Heal Available: No";
