let bgImg = null;
let playerImg = null;
let enemyImg = null;
let bulletImg = null;

function preload() {
  bgImg = loadImage('https://github.com/MikeZhong1102/MikeZhong1102.github.io/blob/main/text/background.png?raw=true');

}









let playerSpeed = 5;


let playerPos = 0;
let bullets = [];
let bulletSpeed = 7;
let bulletTimer = 1;
let shootFreq = 0;


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background('yellow');
  image(bgImg, 0, 0, width, height);
  
 
}
