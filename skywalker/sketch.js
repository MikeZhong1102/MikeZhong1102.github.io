let coverImage;
let showCover = true;
let bgm;
let bgImg = null;
let score = 0;
let font;
let explosionSound;
let playerSpeed = 5;
let enemySpeed = 5;
let playerPos = {x: 0, y: 0};
let supportLeftPos = {x: 0, y: 0};
let supportRightPos = {x: 0, y: 0};
let enemyPos = {x: 0, y: 0};
let bullets = [];
let supportLeftBullets = [];
let supportRightBullets = [];
let supportBulletSpeed = 3;
let supportShootFreq = 0;
let supportBulletFlyFreq = 0;
let bulletSpeed = 3;
let shootFreq = 0;
let bulletFlyFreq = 0;
let enemyFlyFreq = 0;
let timer = 1000;
let supportTimer = 1000;
let bulletImg;
let playerImg;
let enemyImg;
let supportImg;
let supportBulletImg;

function preload() {
  coverImage = loadImage('cover.png');
  bgm = loadSound('bgm.wav');
  bgImg = loadImage('background.jpeg');
  bulletImg = loadImage('bullet.png');
  playerImg = loadImage('player.png');
  enemyImg = loadImage('enemy.png');
  font = loadFont('Australian Signature.otf');
  explosionSound = loadSound('explosion.wav');
  supportImg = loadImage('support.png');
  supportBulletImg = loadImage('supportBullet.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerPos.x = width / 2;
  playerPos.y = height - playerImg.height / 2;
  supportLeftPos.x = playerPos.x - playerImg.width / 2 - supportImg.width;
  supportLeftPos.y = playerPos.y;
  supportRightPos.x = playerPos.x + playerImg.width / 2 + supportImg.width;
  supportRightPos.y = playerPos.y;
  enemyPos.x = width / 2;
  enemyPos.y = -enemyImg.height;
}

function draw() {
  if (showCover) {
    image(coverImage, 0, 0, width, height); 
  } else {
    bgm.loop();
    background('yellow');
    image(bgImg, 0, 0, width, height);

    textFont(font);
    stroke('black');
    fill('white');
    textSize(50);
    text('score:', 40, 100);
    textSize(30);
    text(score, 120, 100);

    image(playerImg, playerPos.x - playerImg.width / 2, playerPos.y - playerImg.height / 2);
    image(supportImg, supportLeftPos.x - supportImg.width / 2, supportLeftPos.y - supportImg.height / 2);
    image(supportImg, supportRightPos.x - supportImg.width / 2, supportRightPos.y - supportImg.height / 2);

    playerPos.x = mouseX;
    if (mouseX < playerImg.width / 2) {
      playerPos.x = playerImg.width / 2;
    } else if (mouseX > width - playerImg.width / 2) {
      playerPos.x = width-playerImg.width / 2;
    }
    supportLeftPos.x = playerPos.x - playerImg.width / 2 - supportImg.width;
    supportRightPos.x = playerPos.x + playerImg.width / 2 + supportImg.width;

    shootFreq += deltaTime/timer;
    if (shootFreq > 1) {
      let bullet = {x: playerPos.x, y: playerPos.y - playerImg.height / 2};
      bullets.push(bullet);
      shootFreq = 0;
    }

    supportShootFreq += deltaTime/supportTimer;
    if (supportShootFreq > 1) {
      let supportLeftBullet = {x: supportLeftPos.x, y: supportLeftPos.y - supportImg.height / 2};
      let supportRightBullet = {x: supportRightPos.x, y: supportRightPos.y - supportImg.height / 2};
      supportLeftBullets.push(supportLeftBullet);
      supportRightBullets.push(supportRightBullet);
      supportShootFreq = 0;
    }

    for (let n = 0; n < bullets.length; n++) {
      let bullet = bullets[n];
      image(bulletImg, bullet.x - bulletImg.width / 2, bullet.y - bulletImg.height / 2);
    }

    for (let n = 0; n < supportLeftBullets.length; n++) {
      let supportLeftBullet = supportLeftBullets[n];
      let supportRightBullet = supportRightBullets[n];
      image(supportBulletImg, supportLeftBullet.x - supportBulletImg.width / 2, supportLeftBullet.y - supportBulletImg.height / 2);
      image(supportBulletImg, supportRightBullet.x - supportBulletImg.width / 2, supportRightBullet.y - supportBulletImg.height / 2);
    }

    bulletFlyFreq += deltaTime / 1000;
    if (bulletFlyFreq > 0.1) {
      for (let n = 0; n < bullets.length; n++) {
        let bullet = bullets[n];
        bullet.y -= bulletSpeed;
      }
    }

    supportBulletFlyFreq += deltaTime / 1000;
    if (supportBulletFlyFreq > 0.1) {
      for (let n = 0; n < supportLeftBullets.length; n++) {
        let supportLeftBullet = supportLeftBullets[n];
        let supportRightBullet = supportRightBullets[n];
        supportLeftBullet.y -= supportBulletSpeed;
        supportRightBullet.y -= supportBulletSpeed;
      }
    }

    enemyFlyFreq += deltaTime / 1000;
    if (enemyFlyFreq > 0.02) {
      enemyPos.y += enemySpeed;
      enemyFlyFreq = 0;
    }

    image(enemyImg, enemyPos.x - enemyImg.width / 2, enemyPos.y - enemyImg.height / 2);

    if (enemyPos.y > height + enemyImg.height / 2) {
      displayWinPopup();
    }

    for (let n = 0; n < bullets.length; n++) {
      let bullet = bullets[n];
      if (bullet.x - bulletImg.width / 2 < enemyPos.x + enemyImg.width / 2 &&
        bullet.x + bulletImg.width / 2 > enemyPos.x - enemyImg.width / 2 &&
        bullet.y + bulletImg.height / 2 > enemyPos.y - enemyImg.height / 2 &&
        bullet.y - bulletImg.height / 2 < enemyPos.y + enemyImg.height / 2) {
        enemyPos.y = -enemyImg.height;
        enemyPos.x = map(random(width), 0, width, playerImg.width / 2 - bulletImg.width / 2, width - playerImg.width / 2 + bulletImg.width / 2);
        explosionSound.play();
        score++;
        if (enemySpeed < 20) {
          enemySpeed++;
        }
        if (timer > 300) {
          timer /= 2;
        }
        if (supportTimer > 300) {
          supportTimer /= 2;
        }
      }
    }

    for (let n = 0; n < supportLeftBullets.length; n++) {
      let supportLeftBullet = supportLeftBullets[n];
      if (supportLeftBullet.x - supportBulletImg.width / 2 < enemyPos.x + enemyImg.width / 2 &&
        supportLeftBullet.x + supportBulletImg.width / 2 > enemyPos.x - enemyImg.width / 2 &&
        supportLeftBullet.y + supportBulletImg.height / 2 > enemyPos.y - enemyImg.height / 2 &&
        supportLeftBullet.y - supportBulletImg.height / 2 < enemyPos.y + enemyImg.height / 2) {
        enemyPos.y = -enemyImg.height;
        enemyPos.x = map(random(width), 0, width, playerImg.width / 2 - bulletImg.width / 2, width - playerImg.width / 2 + bulletImg.width / 2);
        explosionSound.play();
        score++;
        if (enemySpeed < 20) {
          enemySpeed++;
        }
        if (timer > 300) {
          timer /= 2;
        }
        if (supportTimer > 300) {
          supportTimer /= 2;
        }
      }
    }

    for (let n = 0; n < supportRightBullets.length; n++) {
      let supportRightBullet = supportRightBullets[n];
      if (supportRightBullet.x - supportBulletImg.width / 2 < enemyPos.x + enemyImg.width / 2 &&
        supportRightBullet.x + supportBulletImg.width / 2 > enemyPos.x - enemyImg.width / 2 &&
        supportRightBullet.y + supportBulletImg.height / 2 > enemyPos.y - enemyImg.height / 2 &&
        supportRightBullet.y - supportBulletImg.height / 2 < enemyPos.y + enemyImg.height / 2) {
        enemyPos.y = -enemyImg.height;
        enemyPos.x = map(random(width), 0, width, playerImg.width / 2 - bulletImg.width / 2, width - playerImg.width / 2 + bulletImg.width / 2);
        explosionSound.play();
        score++;
        if (enemySpeed < 20) {
          enemySpeed++;
        }
        if (timer > 300) {
          timer /= 2;
        }
        if (supportTimer > 300) {
          supportTimer /= 2;
        }
      }
    }
  }
}

function mousePressed() {
  showCover = false;
}

function displayWinPopup() {
  let scoreDiv = createDiv(`Your score: ${score}`);
  scoreDiv.position(width / 2 - 100, height / 2 - 50);
  scoreDiv.style('font-size', '20px');
  scoreDiv.style('color', 'red');

  playAgainButton = createButton('Play Again');
  playAgainButton.position(width / 2 - 40, height / 2 + 20);
  playAgainButton.mousePressed(restartGame);
  bgm.stop();
  noLoop();
}

function restartGame() {
  let elements = selectAll('div');
  elements.forEach(e => e.remove());
  playAgainButton.remove();
  enemyPos.y = -enemyImg.height;
  enemyPos.x = map(random(width), 0, width, playerImg.width / 2 - bulletImg.width / 2, width - playerImg.width / 2 + bulletImg.width / 2);
  score = 0;
  enemySpeed = 5;
  timer = 1000;
  supportTimer = 1000;
  bgm.loop();
  loop();
}
