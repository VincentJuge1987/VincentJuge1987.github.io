"use strict";

const cons = console;

let string = "";
const print = function(s) {
  if ((typeof s) != (typeof "s")) {
    throw new Error("Your argument should be a one-character string!");
  } else if (s.length != 1) {
    throw new Error("Your argument should be a one-character string!");
  } else {
    string = string + s;
  }
};

const newLine = function() {
  cons.log(string);
  string = "";
};

const noMoreConsole = function() {
  console = {};
  console.log = () => { throw new Error("You are not allowed to use console.log()!"); }
};
