"use strict";

let ajax = new XMLHttpRequest();
ajax.onreadystatechange = function() {
  if (ajax.readyState == 4 && ajax.status == 200) {
    console.log(ajax.responseText);
    const json = JSON.parse(ajax.responseText);
    console.log(json);
    showJSONInTable(json);
    showJSONQuantity(json);
  }
};
ajax.open("GET", "http://localhost:8080/fruitQuantities.json", true);
ajax.overrideMimeType("application/json");
ajax.send();

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

