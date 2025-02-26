"use strict";

const alea = function(prob, borne) {
  let sum = Array(borne).fill().map((v,p) => p+1).map(prob).reduce((a,b) => a+b, 0);
  for(;true;){
   const i = Math.floor(borne * Math.random()) + 1;
   if (sum * Math.random() < prob(i)) { return i; }
  }
};
