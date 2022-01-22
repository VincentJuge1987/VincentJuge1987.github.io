"use strict";

function doAjax(url, callback) {
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (ajax.readyState != 4) {
      return;
    }
    if (ajax.status == 200) {
      var json = JSON.parse(ajax.responseText);
      console.log(json);
      callback(json);
    } else {
      console.log('oops');
      console.log(ajax);
    }
  };
  ajax.open("GET", url, true);
  ajax.send();
}

doAjax('fruits.json', function(fruits) {
  var table = document.getElementById("basket");
  var html = fruits.map(function (fruit) {
    return "<tr><td>" + fruit.name + "</td><td>" + fruit.quantity + "</td></tr>";  
  }).join("");
  table.innerHTML = html;
    
  var quantity = document.getElementById("quantity");
  quantity.innerHTML = "" + fruits.reduce(function(acc, fruit) {
    return acc + fruit.quantity;
  }, 0);
    
  doAjax('prices.json', function(prices) {
    var price = document.getElementById("price");
    price.innerHTML = "" + fruits.reduce(function(acc, fruit) {
     return acc + prices[fruit.name] * fruit.quantity;
    }, 0);
  });
});