"use strict";

var ajax = new XMLHttpRequest();
ajax.onreadystatechange = function() {
  if (ajax.readyState != 4) {
    return;
  }
  if (ajax.status == 200) {
    var fruits = JSON.parse(ajax.responseText);
    console.log(fruits);
    
    var table = document.getElementById("basket");
    var html = fruits.map(function (fruit) {
      return "<tr><td>" + fruit.name + "</td><td>" + fruit.quantity + "</td></tr>";  
    }).join("");
    table.innerHTML = html;
    
    var quantity = document.getElementById("quantity");
    quantity.innerHTML = "" + fruits.reduce(function(acc, fruit) {
      return acc + fruit.quantity;
    }, 0);
    
  } else {
    console.log('oops');
    console.log(ajax);
  }
};
ajax.open("GET", "fruits.json", true);
ajax.send();