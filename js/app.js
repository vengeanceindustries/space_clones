// ***** GLOBAL VARIABLES *****

const canvas = $("canvas");

const ctx = canvas[0].getContext("2d");
canvas.attr("width", $(document).width());
canvas.attr("height", $(document).height());

const modal = $(".modal");
const openModal = $(".modal-content");
const closeModal = $("#close-button");



// instantiate game object

const game = {
	highScore: 20000,
	// switch to false if 2 player mode selected
	isSolo: true,
	isPlayer1Turn: true,
	player1Score: 0,
	player1Lives: 3,
	player1IsDead: false,
	player1Items: [],
	player2Score: 0,
	player2Lives: 3,
	player2IsDead: false,
	player2Items: [],
	// infinite levels? idk
	amountLevels: 5,
	enemiesRemaining: 0,
	currentLevel: 1,
	isPaused: false,
	newGame() {
		// load prologue
		// level 1
		// player stats default
		// score 0
	},
	playerSwitch() {
		// switch all stats displayed // affected
		// catch if both players are dead
	},
	startTurn() {
		// reboot level where progress was made
		// display player1 start or player 2 start
	},
	pause() {
		this.isPaused = true;
		// modal pop up
		// display stats
		// option to quit
		// all game level animations freeze in place
		// display controls
	},
	genLevel() {
		// instantiate new ships and a mothership
		// for loop to increment amount of ships + enemy stats?
		for (let i = 0; i < this.amountLevels; i++) {
			// this.currentLevel times stats = base enemy stats

		}
	},
	endLevel() {
		currentLevel++;
		// display message
		// firing accuracy
		// end bonus points?
		genLevel();
	},
	score() {
		// set player score updating conditions first
		// for each base enemy, 100 points
		// mothership, 1000 points
		// extra life conditions could go here eventually
		
		// set high score updating conditions
		if (this.player1Score > this.player2Score && this.player1Score > this.highScore) {
			this.highScore = this.player1Score;
		} else if (his.player2Score > this.player1Score && this.player2Score > this.highScore) {
			this.highScore = this.player2Score;
		}
	},
	win() {
		// victory message with concluding story text
		// animation depicting end
		// display player score, accuracy
	},
	reset() {
		// restore all values to default
		// return to title screen
		setDefault();
		returnToTitle();
	},
	gameOver() {
		// game end message
		// return to title screen
		// set conditions for one player vs two players
		if (this.isSolo) {
			setDefault();
			returnToTitle();
			// game end message
			// return to title screen
		} else {
			if (this.player1Lives === 0) {
				this.player1IsDead = true;
				// game end message
			} else if (this.player2Lives === 0) {
				this.player2IsDead = true;
			} else if (this.player1IsDead && this.player2IsDead) {
				setDefault();
				returnToTitle();
			}
			// set conditions for both players
		}
	}
}


// ***** BUTTONS *****

$("#solo").on("click", function(event) {
	game.isSolo = true;
	game.newGame();
});
$("#co-op").on("click", function(event) {
	game.isSolo = false;
	game.newGame();
});
$("#prologue").on("click", function(event){
	console.log("hi");
	// display prologue
	// return to title screen
	// allow player to exit early 
	// without watching whole thing
});
$("#how-to-play").on("click", function(event){
	console.log("hi");
})

//  ***** MODALS *****

closeModal.on("click", function (event) {
	modal.removeClass("show-modal");
});

openModal.on("click", function (event) {
	if (lightOn && !pet.isDead && pet.isClean && !pet.isPlaying && !pet.isEating) {
		modal.addClass("show-modal");
	}
});

// ***** FUNCTIONS *****

const returnToTitle = () => {
	// switch page to title screen
	// display a modal with a message
	// with a button that links to title screen?
}

// function to restore all default stats for both players
const setDefault = () => {
	$("#player-score").text("Player Score: 0");
	this.player1Score = 0;
	this.player2Score = 0;
	this.player1IsDead = false;
	this.player2IsDead = false;
	this.player1Lives = 3;
	this.player2Lives = 3;
	this.currentLevel = 1;
	this.isPaused = false;
} 



// ***** CANVAS *****


// write a function that generates a desired amount of circles
const genStars = (numCircles) => {
	for (let i = 0; i < numCircles; i++) {
		ctx.beginPath();

		let x = Math.floor(Math.random() * 1400);
		let y = Math.floor(Math.random() * 800);
		let radius = Math.ceil(Math.random() * 3)
		ctx.arc(x, y, radius, 0, Math.PI * 2)
		ctx.fillStyle = "white";
		stars.push(ctx.fill());
		ctx.closePath();
	}
}

genStars(500);


