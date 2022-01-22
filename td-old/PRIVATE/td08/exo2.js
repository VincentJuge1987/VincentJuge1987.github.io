(function() {  // IFFY

/*
function printAll(element) {
  console.log(element);
  for(var i = 0; i < element.children.length; i++) {
    printAll(element.children[i]);  
  }
}*/

/*
function forAllPre(element, action) {
  if (element.localName == "pre") {
    action(element);
  }
  for(var i = 0; i < element.children.length; i++) {
    forAllPre(element.children[i], action);  
  }
}*/

/*
function forAllPre(element, action) {
  var elements = element.getElementsByTagName("pre");
  for(var i = 0; i < elements.length; i++) {
    action(elements[i]);
  }
}
*/

/* http://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array */
function forAllPre(element, action) {
  var elements = element.getElementsByTagName("pre");
  [].slice.call(elements).forEach(action);
}

function trim(text) {
  //return text.split('\n').map(function (line) { return line.trim(); }).join('\n');
  return text.split('\n').map(Function.prototype.call.bind("".trim)).join('\n');
}

window.onload = function() {
  console.log("window loaded !");
  forAllPre(window.document, function(element) {
    element.innerHTML = trim(element.innerHTML);
  });
};

})();
