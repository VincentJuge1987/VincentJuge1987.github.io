"use strict";

const launchAndThen = function(then, ...urls) {
  let pending = urls.length;
  let responses = urls.map(() => undefined);
  for(let i = 0; i < urls.length; i++) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        if (responses[i] == undefined) {
          responses[i] = ajax.responseText;
          pending--;
          if (pending == 0) {
            then(responses);
          }
        }
      }
    };
    ajax.open("GET", urls[i], true);
    ajax.overrideMimeType("application/json");
    ajax.send();
  }
};

const postAction = function(responses) {
  const fruits = JSON.parse(responses[0]);
  const prices = JSON.parse(responses[1]);
  showJSONInTable(fruits);
  showJSONQuantity(fruits);
  showJSONPrice(fruits, prices);  
};

const showJSONInTable = function(json) {
  const table = document.getElementById("basket");
  for(let fruit of json) {
    const row = document.createElement("tr");
    const fruitName = document.createElement("td");
    const fruitQuantity = document.createElement("td");
    fruitName.innerText = fruit.name;
    fruitQuantity.innerText = fruit.quantity;
    row.appendChild(fruitName);
    row.appendChild(fruitQuantity);
    table.appendChild(row);
  }
};

const showJSONQuantity = function(json) {
  const span = document.getElementById("quantity");
  const quantity = json.reduce((acc, fruit) => acc + fruit.quantity, 0);
  span.innerText = quantity;
};

const showJSONPrice = function(fruits, prices) {
  const span = document.getElementById("price");
  const price = fruits.reduce((acc, fruit) => acc + fruit.quantity * prices[fruit.name], 0);
  span.innerText = price;
};

launchAndThen(postAction,"http://localhost:8080/fruits.json","http://localhost:8080/prices.json");
