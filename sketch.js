let y = 0;
let x = 300;
let score = 0;
let speed = 5;
let font;
let img;
let mySound;
let coverImage;
let showCover = true;

function preload() {
  font = loadFont('Australian Signature.otf');
  img = loadImage('https://img.88tph.com/production/20180914/13103514-0.jpg!/watermark/url/L3BhdGgvbG9nby5wbmc/align/center/fw/640/quality/70');
  soundFormats('wav', 'ogg');
  mySound = loadSound('beat.wav');
  coverImage = loadImage('https://www.signschool.com/static/img/startImg5.png');
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
   if (showCover) {
    image(coverImage, 0, 0, width, height); 
  } else {
    background(img);
    textFont(font);
    stroke('black');
    fill('white');
    textSize(50);
    text('score:', 40, 100);
    textSize(30);
    text(score, 120, 100);
    let mx = mouseX;
    if (mouseX < 50) {
      mx = 50;
    } else if (mouseX > 550) {
      mx = 550;
    }
    strokeWeight(5);
    stroke('white');
    fill('blue');
    rect(mx-50, 500, 100, 10)
    strokeWeight(10);
    stroke('red');
    let factor = map(x, 0, 600, 0, 300);
    drawShapeCombo(x, y, 50, 10, color(100, 100, factor));
    y += speed;
    if (y == 475 && x >= mx-50 && x <= mx+50) {
      mySound.play();
      score += 1;
      y = 0;
      x = random(600); 
    }
    if (y==600) {
      exit(1);
    }
  }
}

function drawShapeCombo(x, y, circleSize, rectSize, shapeColor) {
  fill(shapeColor);
  circle(x, y, circleSize);
  rect(x - rectSize / 2, y - rectSize / 2,rectSize, rectSize);
}

function mousePressed() {
  showCover = false;
}
