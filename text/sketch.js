let coverImage;
let showCover = true;
let bgImg = null;
let score = 0;
let font;
let mySound;
let playerSpeed = 5;
let enemySpeed = 5;
let playerPos = {x: 0, y: 0};
let enemyPos = {x: 0, y: 0};
let bullets = [];
let bulletSpeed = 3;
let shootFreq = 0;
let bulletFlyFreq = 0;
let enemyFlyFreq = 0;
let timer = 1000;

function preload() {
  coverImage = loadImage('https://www.signschool.com/static/img/startImg5.png');
  bgImg = loadImage('https://img.88tph.com/production/20180914/13103514-0.jpg!/watermark/url/L3BhdGgvbG9nby5wbmc/align/center/fw/640/quality/70');
  //bgImg = loadImage('bullet.png');
  font = loadFont('Australian Signature.otf');
  mySound = loadSound('beat.wav');
  
}

function setup() {
  createCanvas(600, 600);
  playerPos.x = width/2-25;
  playerPos.y = 500;
  enemyPos.x = width/2-25;
  enemyPos.y = -100;
}

function draw() {
  if (showCover) {
    image(coverImage, 0, 0, width, height); 
  } else {
    background('yellow');
    image(bgImg, 0, 0, width, height);

    textFont(font);
    stroke('black');
    fill('white');
    textSize(50);
    text('score:', 40, 100);
    textSize(30);
    text(score, 120, 100);

    fill('green');
    rect(playerPos.x - 25, playerPos.y, 50, 50);



    playerPos.x = mouseX;
    if (mouseX < 50) {
      playerPos.x = 25;
    } else if (mouseX > 550) {
      playerPos.x = 575;
    }

    shootFreq += deltaTime/timer;
    if (shootFreq > 1) {
      let bullet = {x: playerPos.x, y: playerPos.y};
      bullets.push(bullet);
      shootFreq = 0;
    }

    for (let n = 0; n < bullets.length; n++) {
      let bullet = bullets[n];
      fill('yellow');
      circle(bullet.x, bullet.y, 10);
    }


    bulletFlyFreq += deltaTime/1000;
    if (bulletFlyFreq > 0.1) {
      for (let n = 0; n < bullets.length; n++) {
        let bullet = bullets[n];
        bullet.y -= bulletSpeed;
      }
    }

    enemyFlyFreq += deltaTime/1000;
    if (enemyFlyFreq > 0.02) {
      enemyPos.y += enemySpeed;
      enemyFlyFreq = 0;
    }

    fill('red');
    rect(enemyPos.x - 25, enemyPos.y, 50, 50);

    if (enemyPos.y > height + 100) {
      enemyPos.y = -100;
      enemyPos.x = random(600);
      score = 0;
      enemySpeed = 5;
      timer = 1000;
    }

    for (let n = 0; n < bullets.length; n++) {
      let bullet = bullets[n];
      if (enemyPos.x - 25 < bullet.x && bullet.x < enemyPos.x + 25 && enemyPos.y - 25 < bullet.y && bullet.y < enemyPos.y + 25) {
        enemyPos.y = -100;
        enemyPos.x = random(600);
        mySound.play();
        score++;
        if (enemySpeed < 20) {
          enemySpeed++;
        }
        if (timer > 200) {
          timer /= 2;
        }
      }
    }
  }
}

function mousePressed() {
  showCover = false;
}
