"use strict";

var colors = [
  "Cornsilk", "BlanchedAlmond", "Bisque", "NavajoWhite", "Wheat",
  "BurlyWood", "Tan", "RosyBrown", "SandyBrown", "Goldenrod",
  "DarkGoldenrod", "Peru", "Chocolate", "SaddleBrown", "Sienna",
  "Brown", "Maroon"
];
   
function graph(canvasId, array) {
  if (array.length == 0) {
    throw "array.length == 0";
  }
       
  var min = array.reduce(function(a, b) { return (a < b)? a: b; });
  var max = array.reduce(function(a, b) { return (a < b)? b: a; });
     
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  context.beginPath();
  context.strokeStyle = "black";
  context.moveTo(0, canvas.height / 2);
  context.lineTo(canvas.width, canvas.height / 2);
  context.stroke();
       
  //context.translate(0, canvas.height / 2);
  //context.scale(canvas.width / array.length, canvas.height / (min - max) / 2);
       
  
       
  array.forEach(function(v, i) {
     context.fillStyle = colors[((v >= 0)? v: -v) % colors.length];
     context.fillRect((i + 0.1) * canvas.width / array.length, canvas.height / 2, 0.8 * canvas.width / array.length, v * canvas.height / (min - max) / 2);
     
     context.strokeText(v, (i + 0.4)* canvas.width / array.length, canvas.height /10);
  });
}
 