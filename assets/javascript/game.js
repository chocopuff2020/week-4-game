function Character(name, hp, attack, counter, imgFile) {
	this.name = name;
	this.hp = hp;
	this.attack = attack;
	this.counter = counter;
	this.imgPath = "./assets/images/" + imgFile ;
}


Character.fight = function(defender) {
		defender.hp = defender.hp - this.attack;

		if(defender.hp <1){
			alert("You've defeated " + defender.name);
		} else {
			this.hp -= defender.counter;
		}

		if (this.hp < 1) {
			alert("You've lost!");
		}
}


var orgCharArray =[
	new Character("Tyrell", 100, 10, 10, "pic1.jpg"),
	new Character("Cersei", 200, 20, 20, "pic2.jpg"),
	new Character("Dragon", 300, 30, 30, "pic3.jpg"),
	new Character("Sansa", 400, 40, 40, "pic4.jpg"),
	new Character("Jon", 500, 50, 50, "pic5.jpg"),
]

var charArray = $.map(orgCharArray, function(obj) {
	return $.extend({},obj);
});

// GENERATE CHARACTER LIST:
function generateChar(objList) {
	for( var i=0; i< objList.length; i++) {
		var charItem = $(".characters").add("<div class='characters'>");
			charItem.attr("id", i+1);
			charItem.attr("data-name", objList[i].name);
			charItem.attr("data-hp", objList[i].hp);
			charItem.attr("data-attack",objList[i].attack);
			charItem.append(`<img src=${objList[i].imgPath} class='img-responsive'>`);
	}
}

		// charItem.append("<img class='img-responsive'" + "src =" + objList[i].imgPath ">");

// var playerMain = charArray[parseInt($(this).attr('id')) - 1];
// var oponent= charArray[parseInt($(this).attr('id')) - 1];;


$(document).ready(function() {
		generateChar(charArray);
		
		var playerMain;
		var opponent;


		$(".characters img").on("click",function(e) {
			$(".selected-character-section").append(e.target);
			playerMain = charArray[parseInt($(this).attr('id')) - 1];
			$(".available-to-attack-section").append($(".characters img"));
			$(".available-to-attack-section img").on("click", function(event) {
				$(".enemy").append(event.target);
				opponent= charArray[parseInt($(this).attr('id')) - 1];
			});
		});

		$(".attack-button").on("click", function() {
			if(opponent) {
				playerMain.fight(opponent);
			}
		});
});
