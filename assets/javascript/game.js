var ORIGINAL_CHARACTERS = [
  {
    name: "Tyrell",
    hp: 100,
    attack: 10,
    counter: 10,
    imgFile: "pic1.jpg",
  },
  {
    name: "Cersei",
    hp: 200,
    attack: 20,
    counter: 20,
    imgFile: "pic2.jpg",
  },
  {
    name: "Dragon",
    hp: 300,
    attack: 30,
    counter: 30,
    imgFile: "pic3.jpg",
  },
  {
    name: "Sansa",
    hp: 400,
    attack: 40,
    counter: 40,
    imgFile: "pic4.jpg",
  },
  {
    name: "Jon",
    hp: 500,
    attack: 50,
    counter: 50,
    imgFile: "pic5.jpg",
  },
]

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
  var characterList = ORIGINAL_CHARACTERS.map(function (stats) {
    return new Character(Object.assign(stats, { onClick: that.onCharacterClick.bind(that) }));
  });

  this.allCharacters = characterList;
  this.initializeCharacters();
}

Game.prototype.initializeCharacters = function() {
  var container = document.querySelector('.row.characters');
  this.allCharacters.forEach(function (character) {
    container.appendChild(character.element);
  });
};

Game.prototype.onCharacterClick = function(character) {
  if (!this.mainCharacter) {
    this.mainCharacter = character;
  }
  if (!this.currentEnemy) {
    this.currentEnemy = character;
  }
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




// // GENERATE CHARACTER LIST:
// function generateChar(objList) {
//     for (var i = 0; i < objList.length; i++) {
//         var charItem = $(".characters").add("<div class='characters'>");
//         charItem.attr("id", i + 1);
//         charItem.attr("data-name", objList[i].name);
//         charItem.attr("data-hp", objList[i].hp);
//         charItem.attr("data-attack", objList[i].attack);
//         charItem.append(`<img src=${objList[i].imgPath} class='img-responsive'>`);
//     }
// }

// // charItem.append("<img class='img-responsive'" + "src =" + objList[i].imgPath ">");

// // var playerMain = charArray[parseInt($(this).attr('id')) - 1];
// // var oponent= charArray[parseInt($(this).attr('id')) - 1];;


// $(document).ready(function() {
//     generateChar(charArray);

//     var playerMain;
//     var opponent;


//     $(".characters img").on("click", function(e) {
//         $(".selected-character-section").append(e.target);
//         playerMain = charArray[parseInt($(this).attr('id')) - 1];
//         $(".available-to-attack-section").append($(".characters img"));
//         $(".available-to-attack-section img").on("click", function(event) {
//             $(".enemy").append(event.target);
//             opponent = charArray[parseInt($(this).attr('id')) - 1];
//         });
//     });

//     $(".attack-button").on("click", function() {
//         if (opponent) {
//             playerMain.fight(opponent);
//         }
//     });
// });
