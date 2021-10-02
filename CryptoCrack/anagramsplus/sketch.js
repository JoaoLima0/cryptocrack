class LetterPoint{
  constructor(x, y, char, active=false){
    this.x = x;
    this.y = y;
    this.char = char;
    this.active = active;
  }

  setActive(target){
    this.active = target;
  }

  toggleActive(){
    this.active = !this.active
  }

  drawPoint(){
    //console.log(this.x);
    this.active ? stroke(20,230,255) : stroke(255)
    strokeWeight(7)
    point(this.x, this.y)
  }

  drawLetter(){
    stroke(255)
    strokeWeight(1)
    fill(255)
    textSize(20)
    text(this.char.toUpperCase(), this.x-24, this.y+6)
  }
}


var lpArray = []
var canvasWidth = 500
var canvasHeight = 300
var canvasCenter = [canvasWidth/2, canvasHeight/2]

var section = {
  startAngle: 45,
  sizeAngle: 120,
  drawLines: function(){
    drawLineFromAngle(this.startAngle)
    drawLineFromAngle(this.startAngle+this.sizeAngle)
  }
}

function drawLineFromAngle(angle){
  let edgePoint = angleEdgePoint(angle)
  //console.log(edgePoint);
  stroke(255, 70, 70)
  strokeWeight(3)
  line(canvasCenter[0], canvasCenter[1], edgePoint.x, edgePoint.y)
}

function angleEdgePoint(angle){
  var dX = abs(cos(angle))
  var dY = abs(sin(angle))
  var quadrant = ((angle-angle%90)/90)%4
  //console.log("Angle: "+angle+" Quadrant: "+quadrant);
  if(quadrant == 0 || quadrant == 3){
    dX *= -1
  }
  if(quadrant == 0 || quadrant == 1){
    dY *= -1
  }
  dX *= canvasWidth
  dY *= canvasHeight
  //console.log("dX: "+dX+" dY:"+dY);
  var result = {
    x: canvasCenter[0]+dX,
    y: canvasCenter[1]+dY
  }
  //console.log(result);
  return result
}

function mouseClicked(){
  var lines = (lpArray.length-lpArray.length%5)/5+1
  var distVertical = floor(canvasHeight/lines)
  var distHorizontal = floor(canvasWidth/5)
  function getPos(i, j){
    return {
      x: distHorizontal*(i+0.5),
      y: distVertical*(j+0.5)
    }
  }
  mouseX-mouseX%distHorizontal;

  //createMassLPoints("abcdefghijklmnopqrstu")
}

function createMassLPoints(str){
  //console.log("a");
  lpArray = []
  var lines = (str.length-str.length%5)/5+1
  var distVertical = floor(canvasHeight/lines)
  var distHorizontal = floor(canvasWidth/5)
  function getPos(i, j){
    return {
      x: distHorizontal*(i+0.5),
      y: distVertical*(j+0.5)
    }
  }
  for(var i = 0; i < str.length; i++){
    let chCode = str.charCodeAt(i)
    //console.log(chCode);
    if(chCode >= 97 && chCode <= 122){
      let tempPos = getPos(i%5, (i-i%5)/5)
      //console.log(tempPos);
      let tempLP = new LetterPoint(tempPos.x, tempPos.y, str.charAt(i))
      lpArray.push(tempLP)
    }
  }
  redrawAll()
}


function redrawAll(){
  background(0)
  drawAllLPoints()
  section.drawLines()
  // line(0,30,500,30)
}

function drawAllLPoints(){
  for(var i = 0; i < lpArray.length; i++){
    lpArray[i].drawPoint()
    lpArray[i].drawLetter()
  }
}


function setup() {
  angleMode(DEGREES)
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvasContainer")
  background(0)
  noSmooth()
  lpArray = []
  lpArray.push(new LetterPoint(50, 50, 'a'))
  lpArray.push(new LetterPoint(150, 50, 'c', true))
  //console.log(testLetterPoint.drawPoint());
  redrawAll()

}

function toggleActive(index){
  lpArray[i].toggleActive()
}


function definingLines(){

}


function draw() {
  // put drawing code here
}
