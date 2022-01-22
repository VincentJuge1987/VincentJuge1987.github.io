
function MemoryGame(images, blank) {
  this.cards = images;
  this.back = blank;
  this.shuffle = shuffleCards(images.length);
  this.uncovered = [];
  this.pendingCardNumber = -1;
  this.pendingElement;
}

function showCardOnClick(element, div, i, j) {
  element.onclick = function(event) {
  	var child = document.createElement("p");
    child.innerHTML = i + " " + j;
    div.appendChild(child);
  }
}

function showCardOnClick2(element, image) {
  element.onclick = function(event) {
    element.children[0].src = image;
  }
}

function showCardOnClick3(element, memory, i) {
  element.onclick = function(event) {
    if (!memory.uncovered[i]) {
      var j = memory.shuffle[i];
      var pCN = memory.pendingCardNumber;
      var pE = memory.pendingElement;
      if (memory.pendingCardNumber == -1) {
        memory.uncovered[i] = true;
        memory.pendingCardNumber = i;
        memory.pendingElement = element;
        element.children[0].src = memory.cards[j];
      } else if (memory.shuffle[memory.pendingCardNumber] == j) {
        memory.uncovered[i] = true;
        memory.pendingCardNumber = -1;
        element.children[0].src = memory.cards[j];
      } else {
        //memory.uncovered[memory.pendingCardNumber] = false;
        //memory.pendingElement.children[0].src = memory.back;
        memory.uncovered[i] = true;
        memory.pendingCardNumber = -1;
        element.children[0].src = memory.cards[j];
        window.setTimeout(function () {
          memory.uncovered[pCN] = false;
          memory.uncovered[i] = false;
          pE.children[0].src = memory.back;
          element.children[0].src = memory.back;
        }, 500);
      }
    }
  }
}

function createImage(mem, div, i) {
	var elt = document.createElement("div");
	var img = document.createElement("img");
	img.alt = "card";
	img.src = mem.back;
	elt.appendChild(img);
    div.appendChild(elt);
    // showCardOnClick(elt, div, i, mem.shuffle[i]);
    // showCardOnClick2(elt, mem.cards[mem.shuffle[i]]);
    mem.uncovered.push(false);
    showCardOnClick3(elt, mem, i);
}

MemoryGame.prototype.build = function build(div) {
  // div.innerHTML = this.cards.length;
  for (var i = 0; i < this.shuffle.length; i++) {
    createImage(this,div,i);
  }
}
    
function random(a, b) {
	return a + Math.floor((b-a) * Math.random());
}

function swap(array,i,j) {
	var s = array[i];
	array[i] = array[j];
	array[j] = s;
}

function shuffleCards(length) {
  var cards = [];
  for(var i = 0; i < length; i++) {
    cards.push(i);
    cards.push(i);
  }
  for(var i = 0; i < cards.length; i++) {
  	var j = random(i, cards.length);
  	swap(cards, i, j);
  }
  return cards;
}
