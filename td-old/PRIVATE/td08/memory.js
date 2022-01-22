
function MemoryGame(images, blank) {
  this.cards = shuffleCards(images.length);
  this.images = images;
  this.blank = blank;
  this.selection = undefined;
}

MemoryGame.prototype.build = function build(div) {
  var blank = this.blank;
  div.innerHTML = this.cards.map(function(_, i) {
    return '<a href="#" onclick="game.flipCard(' + i + ');"><div><img src="' + blank + '" id="card' + i + '"></div></a>'; }
  ).join("");
}

/*
function shuffleCards(length) {
  var cards = [];
  for(var i = 0; i < length; i++) {
    cards.push(i);
    cards.push(i);
  }
  return cards;
}*/

function shuffleCards(length) {
  var cards = [];
  for(var i = 0; i < length; i++) {
    cards.push(i);
    cards.push(i);
  }
  for(var i = 0; i < 2 * length; i++) {
    var r = i + Math.floor((2 * length - i)* Math.random());
    var tmp = cards[i];
    cards[i] = cards[r];
    cards[r] = tmp;
  }
  return cards;
}

MemoryGame.prototype.flipCard = function flipCard(i) {
  var element = document.getElementById('card' + i);
  
  var kind = this.cards[i];
  if (kind == -1 || this.selection == i) {
    return;  // bummer !
  }
  element.src = this.images[kind];
  
  var selection = this.selection;
  if (selection == undefined) {
    this.selection = i;
  } else {
    if (this.cards[selection] == kind) {
      this.cards[i] = -1;
      this.cards[selection] = -1;
    } else {
      var otherElement = document.getElementById('card' + selection);
      var blank = this.blank;
      window.setTimeout(function() {
        element.src = blank;
        otherElement.src = blank;
      }, 500);
    }
    this.selection = undefined;
  }
}