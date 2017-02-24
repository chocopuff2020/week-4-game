var ALL_CHARACTERS = [{
  name: "Tyrell",
  hp: 100,
  attack: 10,
  counter: 10,
  imgFile: "pic1.jpg",
}, {
  name: "Cersei",
  hp: 200,
  attack: 20,
  counter: 20,
  imgFile: "pic2.jpg",
}, {
  name: "Dragon",
  hp: 300,
  attack: 30,
  counter: 30,
  imgFile: "pic3.jpg",
}, {
  name: "Sansa",
  hp: 400,
  attack: 40,
  counter: 40,
  imgFile: "pic4.jpg",
}, {
  name: "Jon",
  hp: 500,
  attack: 50,
  counter: 50,
  imgFile: "pic5.jpg",
}, ]

/*----------  containers  ----------*/

var characterContainer = document.querySelector('.row.characters');
var mainCharacterContainer = document.querySelector('.row.selected-character-section');
var enemyListContainer = document.querySelector('.row.available-to-attack-section');
var enemyContainer = document.querySelector('.enemy');
var enemyHealth = document.querySelector('.enemy-health');
var yourHealth = document.querySelector('.your-health');

/*============================
=            Game            =
============================*/

function Game() {
  this.allCharacters = [];
  this.mainCharacter = null;
  this.enemies = [];
  this.currentEnemy = null;
}

Game.prototype.start = function() {
  var that = this;
  var characterList = ALL_CHARACTERS.map(function(stats) {
    return new Character(Object.assign(stats, { onClick: that.onCharacterClick.bind(that) }));
  });
  this.allCharacters = characterList;
  this.initializeAttack();

  this.flush();
}

Game.prototype.onCharacterClick = function(character) {
  // set main character if not defined
  if (!this.mainCharacter) {
    this.mainCharacter = character;
    this.enemies = this.allCharacters.filter(function(c) {
      return c !== character });
    this.allCharacters = [];
  } else if (this.mainCharacter === character) {
    alert('You must choose another character as enemy');
  } else if (!this.currentEnemy) {
    // if main character already defined, set current enemy
    this.currentEnemy = character;
    this.enemies = this.enemies.filter(function(c) {
      return c !== character;
    });
  }

  this.flush();
};

Game.prototype.initializeAttack = function() {
  var that = this;
  document
    .querySelector('.attack-button')
    .addEventListener('click', function(event) {
      if (that.mainCharacter && that.currentEnemy) {
        that.mainCharacter.fight(that.currentEnemy);
        if (that.currentEnemy.hp <= 0) {
          that.currentEnemy.element.remove();
          that.currentEnemy = null;
        }

        that.flush();
      }
    });
};

Game.prototype.flush = function() {
  if (this.mainCharacter) {
    mainCharacterContainer.appendChild(this.mainCharacter.element);
    yourHealth.textContent = this.mainCharacter.hp;
  }

  if (this.currentEnemy) {
    enemyContainer.appendChild(this.currentEnemy.element);
    enemyHealth.textContent = this.currentEnemy.hp;
  } else {
    enemyHealth.textContent = '-';
  }

  this.allCharacters.forEach(function(character) {

    characterContainer.appendChild(character.element);
  });

  this.enemies.forEach(function(enemy) {
    enemyListContainer.appendChild(enemy.element);
  });
};

/*=====  End of Game  ======*/


/*=================================
=            Character            =
=================================*/

function Character(options) {
  this.name = options.name;
  this.hp = options.hp;
  this.attack = options.attack;
  this.counter = options.counter;
  this.onClick = options.onClick;
  this.imgPath = `./assets/images/${options.imgFile}`;
  this.element = this.renderCharacter();
}

Character.prototype.renderCharacter = function(options) {
  var img = document.createElement('img');
  img.src = this.imgPath;
  img.className = 'img-responsive';
  img.addEventListener('click', (event) => {
    this.onClick(this);
  });
  return img;
};

Character.prototype.fight = function(defender) {
  defender.hp = defender.hp - this.attack;

  if (defender.hp < 1) {
    alert("You've defeated " + defender.name);
  } else {
    this.hp -= defender.counter;
  }

  if (this.hp < 1) {
    alert("You've lost!");
  }
}

/*=====  End of Character  ======*/


var game = new Game();
game.start();