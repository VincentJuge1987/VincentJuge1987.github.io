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
  const quantities = JSON.parse(responses[0]);
  const prices = JSON.parse(responses[1]);
  showJSONInTable(quantities);
  showJSONQuantity(quantities);
  showJSONPrice(quantities, prices);  
};

const showJSONInTable = function(json) {
  const table = document.getElementById("basket");
  for(let fruit in json) {
    const row = document.createElement("tr");
    const fruitName = document.createElement("td");
    const fruitQuantity = document.createElement("td");
    fruitName.innerText = fruit;
    fruitQuantity.innerText = json[fruit];
    row.appendChild(fruitName);
    row.appendChild(fruitQuantity);
    table.appendChild(row);
  }
};

const showJSONQuantity = function(json) {
  const span = document.getElementById("quantity");
  const quantity = Object.keys(json).reduce((acc, name) => acc + json[name], 0);
  span.innerText = quantity;
};

const showJSONPrice = function(quantities, prices) {
  const span = document.getElementById("price");
  const price = Object.keys(quantities).reduce((acc, name) => acc + quantities[name] * prices[name], 0);
  span.innerText = price;
};

launchAndThen(postAction,"http://localhost:8080/fruitQuantities.json","http://localhost:8080/prices.json");
