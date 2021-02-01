var song;
var amp;
var fft;
var volhistory = [];
var img;
let iconRotate = 0;
let rSpeed = 0.1;

function preload() {
  song = loadSound('103obliquestrategies.mp3');
  img = loadImage('icon.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();
  angleMode(DEGREES);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);

  amp = new p5.Amplitude();
  song.play();

}


function draw() {
  background(0);
  var vol = amp.getLevel();
  volhistory.push(vol);
  // fill(255);
  // textFont('monospace');
  // textSize(width*.01);
  // text('abandon normal instruments', width/2, height/2);

  drawIcon(iconRotate);
  iconRotate += rSpeed;
  if (iconRotate < -5 || iconRotate > 5) {
    rSpeed = -rSpeed;
  }


  noFill();
  stroke(255);
  translate(width / 2, height / 2);
  beginShape();
  for (var i = 0; i < 360; i++) {
    var r = map(volhistory[i], 0, 1, width*.1, width*.5);
    var x = r * cos(i);
    var y = r * sin(i);

    //var y = map(volhistory[i], 0, 1, height, 0);
    vertex(x, y);
  }
  endShape();

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }
}

function drawIcon(rotation) {
  push();
  translate(width / 2, height / 2);
  rotate(rotation);
  img.resize(width*.2, 0);
  image(img, 0, 0);
  pop();
}
