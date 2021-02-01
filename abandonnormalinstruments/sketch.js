var song;
var amp;
var fft;
var volhistory = [];

function preload() {
  song = loadSound('103obliquestrategies.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();
  angleMode(DEGREES);
  rectMode(CENTER);
  textAlign(CENTER);

  amp = new p5.Amplitude();
  song.play();

}


function draw() {
  background(0);
  var vol = amp.getLevel();
  volhistory.push(vol);
  fill(255);
  textFont('monospace');
  textSize(width*.01);
  text('abandon normal instruments', width/2, height/2);
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
