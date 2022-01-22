class MemoryGame {
  constructor(images, blank) {
    this.images = images;
    this.blank = blank;
    this.positions = shuffleCards(images.length);
    this.visible = this.positions.map(() => false);
    this.images = this.positions.map(() => document.createElement("img"));
    this.partner = undefined;
    this.wait = false;
  }
  
  build(div) {
    //div.innerHTML = this.images.length;
    for(let i = 0; i < this.positions.length; i++) {
      let child = document.createElement("div");
      this.images[i].src = this.blank;
      //img.onclick = () => console.log(`${i}:${this.positions[i]}`);
      //img.onclick = () => img.src = `lego${this.positions[i]+1}.png`;
      this.images[i].onclick = () => this.click(i);
      child.appendChild(this.images[i]);
      div.appendChild(child);
    }
  }
  
  click(i) {
    if (this.wait || this.visible[i]) {
      return;
    }
    if (this.positions[this.partner] == this.positions[i]) {
      this.show(i, true);
      this.partner = undefined;
    } else if (this.partner == undefined) {
      this.show(i, true);
      this.partner = i;
    } else {
      this.wait = true;
      this.show(i, true);
      const game = this;
      window.setTimeout(() => {
          game.show(i, false);
          game.show(game.partner, false);
          game.partner = undefined;
          game.wait = false;
        }, 500);
    }
  }
  
  show(i, bool) {
    this.visible[i] = bool;
    this.images[i].src = bool ? `lego${this.positions[i]+1}.png` : this.blank;
  }
  
}

const shuffleCards = function(length) {
  let cards = [];
  const random = n => Math.floor(n * Math.random());
  const swap = (array,i,j) => {[array[i],array[j]] = [array[j],array[i]];};
  const randomArray = function(array) {
    for(let i = 0; i < array.length; i++) {
      swap(array,i,i + random(array.length - i));
    }
  };
  for(let i = 0; i < length; i++) {
    cards.push(i);
    cards.push(i);
  }
  randomArray(cards);
  return cards;
};
