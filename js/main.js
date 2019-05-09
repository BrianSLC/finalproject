var cols;
var rows;
var boxSize = 10; // 10px Adding this varible for calculations in setup()
var currentSec;
var prevSec;
let loop = 0;
var gridColors;
var colorList = ["SpringGreen", "IndianRed", "YellowGreen", "Aquamarine", "LawnGreen","Yellow","GreenYellow","Chartreuse","LawnGreen","Lime","LimeGreen","PaleGreen","LightGreen","MediumSeaGreen","SpringGreen","MediumSeaGreen","SeaGreen","ForestGreen","Green","DarkGreen","YellowGreen","OliveGreen","OliveDrab","Olive","DarkOliverGreen", "red","black","red"];

// START OF HELPER FUNCTIONS
//----------------------------------------------
function make2Darray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

function randomizeColors(rows, cols, array) {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      array[i][j] = new Array(26);
      array[i][j] = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]);
      array[i][j].push(26)
    }
  }
}

function drawGrid(rows, cols, array, boxSize, loop){
  let k = loop
  if (loop > 26) {
    k = 25;
  }


  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      fill(colorList[array[i][j][k]]);
      stroke(0);
      rect(i*boxSize, j*boxSize, boxSize, boxSize);
    }
  }
}

// END OF HELPER FUNCTIONS
//----------------------------------------------

function setup() {
  // Calculate grid needed for this window size
  cols = ceil(windowWidth/boxSize); //Round up
  rows = ceil(windowHeight/2/boxSize); //Cover half of screen height
  // Create canvas according to window's width / size
  createCanvas(cols*boxSize, rows*boxSize);
  gridColors = make2Darray(cols, rows);
  // Record the current time in prevSec
  prevSec = new Date().getSeconds();
}

function draw() {
  //Commented the line below out, to save processing power, since background gets covered by grid anyway
  //background(50);

  //Console logging FrameRate is a nice way to see the performance of the sketch,
  //however, do note that console logging, ironically, affects frameRate performance.
  //print(frameRate());

  //Get currentSec everytime "Draw() runs"
  currentSec = new Date().getSeconds();
  print(currentSec, prevSec);

  //Run the for loop ONLY IF currenSec is larger than prevSec
  //in other words, run only if a second has passed
  if (currentSec !== prevSec){
    randomizeColors(cols, rows, gridColors); //Randomize the colors
    drawGrid(cols, rows, gridColors, boxSize, loop); //Draw the grid
    prevSec = currentSec; //Update prevSec for next for loop
    loop++
  }
}

//clock
Number.prototype.pad = function(n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};

function updateClock() {
  var now = new Date();
  var milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours(),
    mo = now.getMonth(),
    dy = now.getDate(),
    yr = now.getFullYear();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var tags = ["mon", "d", "y", "h", "m", "s", "mi"],
    corr = [months[mo], dy, yr, hou.pad(2), min.pad(2), sec.pad(2), milli];
  for (var i = 0; i < tags.length; i++)
    document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}

function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1);
}
//clock
