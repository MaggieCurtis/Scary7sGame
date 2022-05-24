var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//GRADIENT FOR ARCS
function addGradientWarm(x1,y1,x2,y2){
  var grd = ctx.createLinearGradient(x1,y1,x2,y2);
  grd.addColorStop(0, "red");
  grd.addColorStop(0.6, "orange");
  grd.addColorStop(0.9, "yellow");
  return grd;
}

//GRADIENT FOR RECTANGLES
function addGradientCool(x1,y1,x2,y2){
  var grd = ctx.createLinearGradient(x1,y1,x2,y2);
  grd.addColorStop(0, "green");
  grd.addColorStop(0.3, "rgb(10, 138, 84)");
  grd.addColorStop(0.6, "blue");
  grd.addColorStop(0.9, "purple");
  return grd;
}

  ctx.fillStyle = addGradientCool(0,0,125,0);
  ctx.fillRect(20, 20, 90, 50);

  ctx.fillStyle = addGradientCool(0,0,0,145);
  ctx.fillRect(200, 40, 50, 90);

  ctx.fillStyle = addGradientCool(0,0,125,400);
  ctx.fillRect(280, 170, 90, 50);

  ctx.fillStyle = addGradientCool(0,0,120,0);
  ctx.fillRect(150, 240, 90, 50);

  ctx.fillStyle = addGradientCool(0,0,120,0);
  ctx.fillRect(20, 120, 50, 90);

  ctx.fillStyle = addGradientCool(0,0,120,0);
  ctx.fillRect(100, 150, 90, 50);

  ctx.fillStyle = addGradientCool(0,0,120,0);
  ctx.fillRect(50, 290, 50, 90);

  ctx.fillStyle = addGradientCool(0,200,0,0);
  ctx.fillRect(270, 75, 50, 90);

  ctx.fillStyle = addGradientCool(0,0,0,80);
  ctx.fillRect(140, 10, 30, 70);

  ctx.beginPath();
  ctx.strokeStyle = addGradientWarm(0,150,0,0);
  ctx.fillStyle = addGradientWarm(0,150,0,0);
  ctx.arc(75, 70, 25, 0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = addGradientWarm(0,0,350,0);
  ctx.fillStyle = addGradientWarm(0,0,350,0);
  ctx.arc(250, 40, 25, 0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = addGradientWarm(200,00,0,0);
  ctx.fillStyle = addGradientWarm(200,0,0,0);
  ctx.arc(150, 150, 25, 0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = addGradientWarm(200,0,0,0);
  ctx.fillStyle = addGradientWarm(200,0,0,0);
  ctx.arc(150, 0, 25, 0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();

//Converts canvas to an image to be used for the background image of the game
var img = canvas.toDataURL("image/png");
document.getElementById("body").style.backgroundImage = "url('" + img + "')";
