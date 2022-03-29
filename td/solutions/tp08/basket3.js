"use strict";

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

const showJSONQuantity = function(quantities) {
  const span = document.getElementById("quantity");
  const sum = Object.keys(quantities).reduce((acc, name) => acc + quantities[name], 0);
  span.innerText = sum;
};

const showJSONPrice = function(quantities, prices) {
  const span = document.getElementById("price");
  const price = Object.keys(quantities).reduce((acc, name) => acc + quantities[name] * prices[name], 0);
  span.innerText = price;
};

const jsonOkOrError = function(response) {
  if (response.ok) {
    return response.json();
  }
  throw Error(response.statusText);
};

Promise.all([
  fetch('http://localhost:8080/fruitQuantities.json').then(jsonOkOrError),
  fetch('http://localhost:8080/prices.json').then(jsonOkOrError)])
  .then(([fruits,prices]) => {
    console.log([fruits,prices]);
    showJSONInTable(fruits);
    showJSONQuantity(fruits);
    showJSONPrice(fruits,prices);
  });
