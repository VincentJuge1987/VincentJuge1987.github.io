"use strict";

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

const jsonOkOrError = function(response) {
  if (response.ok) {
    return response.json();
  }
  throw Error(response.statusText);
};

Promise.all([
  fetch('http://localhost:8080/fruits.json').then(jsonOkOrError),
  fetch('http://localhost:8080/prices.json').then(jsonOkOrError)])
  .then(([fruits,prices]) => {
    console.log([fruits,prices]);
    showJSONInTable(fruits);
    showJSONQuantity(fruits);
    showJSONPrice(fruits,prices);
  });
