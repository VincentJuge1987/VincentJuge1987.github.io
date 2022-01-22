"use strict";

window.onload = function() {
  var canvas = document.getElementById("game_area");
  var context = canvas.getContext("2d");
  console.log(canvas.width + 'x' + canvas.height);

  var player;

  function GameModel() {
    this.bullets = [];
    this.sprites = [];
  }
  GameModel.prototype.addBullet = function addBullet(bullet) {
    this.bullets.push(bullet);
  }
  GameModel.prototype.addSprite = function addSprite(sprite) {
    this.sprites.push(sprite);
  }
  GameModel.prototype.drawAll = function drawAll(context) {
    var draw = function(item) { item.draw(context); };
    context.strokeStyle = 'blue';
    context.beginPath();
    this.sprites.forEach(draw);
    context.stroke();
  
    context.strokeStyle = 'red';
    context.beginPath();
    player.draw(context);
    context.stroke();
  
    this.bullets.forEach(draw);
  }
  GameModel.prototype.collideAll = function collideAll() {
    var bullets = this.bullets;
    var sprites = this.sprites;
    sprites.forEach(function(s) {
      bullets.forEach(function(b) {
        s.collide(b);
      });
      if (player !== s) {
        player.collide(s);
      };
    });
  };
  GameModel.prototype.timeoutAll = function timeoutAll() {
    var timeout = function(item) { return item.timeout(); };
    this.bullets = this.bullets.filter(timeout);
    this.sprites = this.sprites.filter(timeout);
  };
  GameModel.prototype.moveAll = function moveAll() {
    var move = function(item)  { item.move(); };
    this.bullets.forEach(move);
    this.sprites.forEach(move);
  }
  GameModel.prototype.run = function run() {
    this.collideAll();
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.timeoutAll();
    this.moveAll();
    this.drawAll(context);
  };

  function Bullet(x, y, vx, vy, live) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.live = live;
  }
  Bullet.prototype.draw = function draw(context) {
    context.strokeRect(this.x, this.y, 1, 1);
  };
  Bullet.prototype.timeout = function timeout() {
    if (this.x < 0 || this.x >= canvas.width ||
       this.y < 0 || this.y >= canvas.height) {
      return false;   
    }
    this.live = this.live - 1;
    return this.live > 0;
  };
  Bullet.prototype.move = function move() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    this.vx = this.vx * 0.99;
    this.vy = this.vy * 0.99;
  }
  function Sprite(x, y, vx, vy, health, elastic) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.health = health;
    this.elastic = elastic;
  }
  Sprite.prototype.draw = function draw(context) {
    context.moveTo(this.x, this.y - 3);
    context.lineTo(this.x - 2, this.y + 2);
    context.lineTo(this.x + 2, this.y + 2);
    context.lineTo(this.x, this.y - 3);
  };
  Sprite.prototype.collide = function(other) {
    if (Math.abs(this.x - other.x) < 5 &&
        Math.abs(this.y - other.y) < 5) {
      this.health = this.heath - 1; 
    }
  };
  Sprite.prototype.timeout = function timeout() {
    if (!this.isAlive()) {
      console.log("monster is dead");
    }
    return this.isAlive();
  };
  Sprite.prototype.isAlive = function isAlive() {
    return this.health > 0;
  };
  Sprite.prototype.move = function move() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    if (this.x < 0) {
      this.x = 0;
      this.vx = - this.vx * this.elastic;
    }
    if (this.x >= canvas.width) {
      this.x = canvas.width - 1;
      this.vx = - this.vx * this.elastic;
    }
    if (this.y < 0) {
      this.y = 0;
      this.vy = - this.vy * this.elastic;
    }
    if (this.y >= canvas.height) {
      this.y = canvas.height - 1;
      this.vy = - this.vy * this.elastic;
    }
  }

  function random(max) {
    return Math.floor(max * Math.random());
  }

  player = new Sprite(canvas.width / 2, 7 * canvas.height / 8, 0, 0, 10, 0.5);

  var model = new GameModel();
  model.addSprite(player);
  for(var i = 0; i < 300; i++) {
    var monster = new Sprite(random(canvas.width), random(canvas.height / 3), (5 + random(5)) / 10, 1.5, 1, 1.1);                                       
    model.addSprite(monster);
  }

  window.onkeydown = function onkeydown(event) {
    //console.log(event.keyCode);
    var key = event.keyCode;
    if (key == 38) { // up
      player.vy = player.vy - 0.3;
      return;
    }
    if (key == 40) { // down
      player.vy = player.vy + 0.3;
      return;
    }
    if (key == 37) { // left
      player.vx = player.vx - 0.3;
      return;
    }
    if (key == 39) { // right
      player.vx = player.vx + 0.3;
      return;
    }
    if (key == 32) { // space
      model.addBullet(new Bullet(player.x, player.y - 5, 0, -2.5, canvas.height / 2));
      return;
    }
  };

  var gameLoop = function gameLoop() {
    model.run();
    if (player.isAlive()) {
      window.requestAnimationFrame(gameLoop);  
    } else {
      console.log("player is dead");
    }
  };
  window.requestAnimationFrame(gameLoop);
};
