let bgImg = null;
let playerImg = null;
let enemyImg = null;
let bulletImg = null;

function preload() {
  bgImg = loadImg('background.png');
  playerImg = loadImg('player.png');
  enemyImg = loadImg('enemy.png');
  bulletImg = loadImg('bullet.png');
}









let playerSpeed = 5;


let playerPos = 0;
let bullets = [];
let bulletSpeed = 7;
let bulletTimer = 1;
let shootFreq = 0;




function preload() {
  img = loadImage('https://img.88tph.com/production/20180914/13103514-0.jpg!/watermark/url/L3BhdGgvbG9nby5wbmc/align/center/fw/640/quality/70');
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background('yellow');
  image(bgImg, 0, 0, width, height);
  
  push(); 
  imgMode(CENTER);
  img(playerImg, width/2, height - playerImg.height/2);
  pop();
  
  
  playerPos = mouseX;
  if (mouseX < 50) {
    mx = 50;
  } else if (mouseX > 550) {
    mx = 550;
  }
  
  shootFreq += deltaTime/1000;
  if (shootFreq > 1) {
    let bullet = {x: playerPos.x, y: playPos.y};
    bullets.push(bullet);
    shootFreq = 0;
  }
  /*for (let n = 0; n < bullets.length, n++) {
    let bullet = bullets[n];
    img(bulletImg, bullet.x, bullet.y);
  }*/
  
  pop();
}
