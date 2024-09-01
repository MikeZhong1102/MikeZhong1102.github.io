let spacing = 10;
let time = 0;
let speedFactor = 0;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('black');
  for (let x = 0; x < width; x += 5) {
    strokeWeight(1);
    stroke('white');
    line(x, 0, x, 400);
  }
  for (let x = 0; x < width; x += spacing) {
    strokeWeight(1);
    stroke('white');
    line(x, 0, x, 400);
  }
  for (let x = 0; x < width; x += spacing) {
    noFill();
    stroke(time, 100, 30);
    strokeWeight(5);
    circle(x, x, 200);
  }
  time++;
  if (time <= 100) {
    spacing++;
  }
  else if (time <=200){
    spacing--;
  }
  else {
    time = 0;
  }
  speedFactor = map(time, 0, 100, 0, 1);
  translate(width / 2, height / 2);
  let angle = frameCount * speedFactor;
  rotate(angle);
  strokeWeight(5);
  stroke('blue');
  circle(100, 0, 50);
  stroke('red');
  circle(-100, 0, 50);
  
  let x = noise(frameCount * 0.1) * width;
  fill('black');
  circle(x, 0, 50);
}
