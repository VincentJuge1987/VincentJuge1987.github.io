"use strict";

const mapping = function(but,in1,in2,out,fun) {
  const button = document.getElementById(but);
  button.onclick = function() {
    const input1 = document.getElementById(in1);
    const input2 = document.getElementById(in2);
    const output = document.getElementById(out);
    output.innerText = fun(parseInt(input1.value),parseInt(input2.value));
  };
};
const testing = function(but,in1,out,fun) {
  const button = document.getElementById(but);
  button.onclick = function() {
    const input = document.getElementById(in1);
    const output = document.getElementById(out);
    const result = fun(input.value);
    output.innerText = result ? "Oui" : "Non";
    output.classList.remove(result ? "non" : "oui");
    output.classList.add(result ? "oui" : "non");
  };
};
const postAction = function(out,input) {
  const list = input.split(",");
  for(let val of list) {
    const cell = document.createElement("span");
    cell.classList.add("box");
    cell.innerText = val;
    out.appendChild(cell);
  }
};
const writing = function(but,in1,out,fun,post) {
  const button = document.getElementById(but);
  button.onclick = function() {
    const input = document.getElementById(in1);
    const output = document.getElementById(out);
    postAction(output,fun(parseInt(input.value)));
  };
};

const load = function() {
  mapping("button1","area1","area2","area3",sum);
  mapping("button2","area4","area5","area6",pgcd);
  testing("button3","area7","area8",isPrime);
  writing("button4","area9","area10",listPrimes);
};
