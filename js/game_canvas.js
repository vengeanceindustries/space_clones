const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const getDistance = (x1, y1, x2, y2) => {
	// store dist between x and y coords in a variable
	let xDistance = x2 - x1;
	let yDistance = y2 - y1;
	// use pythagoreon theorum to calc distance
	return Math.sqrt(xDistance ** 2 + yDistance ** 2);
}
const ctx = canvas.getContext("2d");

// create star array to store new stars
let stars = [];
// generate 500 stars with function, push into star array
const initStars = () => {
	stars = [];
	for (i = 0; i < 500; i++) {
		let x = Math.random() * canvas.width;
		let y = Math.random() * canvas.height;
		let radius = Math.random() * 2;
		let dy = Math.random() * 5;
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fill();
		stars.push(new Star(x, y, dy, radius))
	}
}
initStars();
// animate the stars in canvas backdrop
function animateStars() {
	requestAnimationFrame(animateStars);
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for (let i = 0; i < stars.length; i++) {
		stars[i].draw();
		stars[i].update();
		stars[i].move();
	}
}

animateStars();

window.addEventListener("resize", function(event) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx2.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	gameCanvas.width = window.innerWidth;
	gameCanvas.height = window.innerHeight;
	initStars();
	initPlayers();
	player1Ship.initialize();
	player1Ship.draw();
})










document.addEventListener("keydown", function(event) {
	const key = event.keyCode;
	// console.log(event.keyCode);
	// PLAYER MOVEMENT
	// right using right arrow or D
	if(key===39 || key===68) {
		player1Ship.direction = "right";
		player1Ship.body.x = player1Ship.body.x + 10;
		player2Ship.direction = "right";
		player2Ship.body.x = player1Ship.body.x + 10;
	// left using left arrow or A
	} else if(key===37 || key===65) {
		player1Ship.direction = "left";
		player1Ship.body.x = player1Ship.body.x - 10;
		player2Ship.direction = "left";
		player2Ship.body.x = player1Ship.body.x - 10;
	} else if (key===32) {
		// space bar to fire
		player1Ship.initLaser();
	} else if (key===13) {
		// return to pause
		// pause the game
		game.pause();
	} else if (key===27) {
		game.reset();
	}
	ctx2.clearRect(0,0, canvas.width, canvas.height)
	player1Ship.draw();
}) 

document.addEventListener("keyup", function(event) {
	const key = event.keyCode;
	if(key===39 || key===68) {
		player1Ship.direction = "";
		// player1Ship.body.x = player1Ship.body.x + 10;
		player2Ship.direction = "";
		// player2Ship.body.x = player1Ship.body.x + 10;
	// left using left arrow or A
	} else if(key===37 || key===65) {
		player1Ship.direction = "";
		// player1Ship.body.x = player1Ship.body.x - 10;
		player2Ship.direction = "";
		// player2Ship.body.x = player1Ship.body.x - 10;
	}
})

// ***GAME CANVAS***

const gameCanvas = document.querySelector("#game-canvas");
gameCanvas.width = window.innerWidth;
// height will be distance between header/footer of game
gameCanvas.height = window.innerHeight;

const ctx2 = gameCanvas.getContext("2d");

const playerShield = 1;
const playerFirepower = 1;
// instantiate ships for player 1 and player 2

const initPlayers = () => {
	player1Ship = new Player(playerFirepower, playerShield);
	player2Ship = new Player(playerFirepower, playerShield);
}

const animatePlayer = () => {
	ctx2.clearRect(0, 0, canvas.width, canvas.height)
	player1Ship.draw();
	player1Ship.move();
	cancelMe1 = requestAnimationFrame(animatePlayer);
}

initPlayers();
player1Ship.initialize();
player1Ship.draw();
animatePlayer();



const animatePlayerFire = () => {

	for (let i = 0; i < player1Ship.shotsFired.length; i++) {
		player1Ship.shotsFired[i].move();
		if (cloneFactory.clones.length > 0) {
			for (let j = 0; j < cloneFactory.clones.length; j++) {
				let playerLaser = player1Ship.shotsFired[i];
				let x1 = player1Ship.shotsFired[i].x;
				let y1 = player1Ship.shotsFired[i].y;
				let width1 = player1Ship.shotsFired[i].width;
				let height1 = player1Ship.shotsFired[i].height;
				let x2 = cloneFactory.clones[j].body.x;
				let y2 = cloneFactory.clones[j].body.y;
				let xPlayer1Center = x1 + (width1 / 2);
				let yPlayer1Center = y1 + (height1 / 2)
				let xCloneCenter = x2 + (cloneFactory.clones[j].body.width / 2);
				let yCloneCenter = y2 + (cloneFactory.clones[j].body.height / 2);
				// let distance = getDistance(x1, y1, x2, y2);
				let player1TLDistToCenter = getDistance(x1, y1, xCloneCenter, yCloneCenter);
				let player1TRDistToCenter = getDistance(x1 + width1, y1, xCloneCenter, yCloneCenter);
				let player1BLDistToCenter = getDistance(x1, y1 + height1, xCloneCenter, yCloneCenter);
				let player1BRDistToCenter = getDistance(x1 + width1, y1 + height1, xCloneCenter, yCloneCenter);
				// while using the center point of the alien ships, I only need to measure two distances for comparison:
				let cloneDist1 = getDistance(x2, y2, xCloneCenter, yCloneCenter);
				let cloneDist2 = getDistance(x2, y2 + cloneFactory.clones[j].body.height, xCloneCenter, yCloneCenter);
			
				if (player1TLDistToCenter <= cloneDist1 || player1TLDistToCenter <= cloneDist2) {
					playerLaser.disappear(player1Ship, playerLaser);
					game.die(cloneFactory.clones[j]);
				} else if (player1TRDistToCenter <= cloneDist1 || player1TRDistToCenter <= cloneDist2) {
					playerLaser.disappear(player1Ship, playerLaser);
					game.die(cloneFactory.clones[j]);
				} else if (player1BLDistToCenter <= cloneDist1 || player1BLDistToCenter <= cloneDist2) {
					playerLaser.disappear(player1Ship, playerLaser);
					game.die(cloneFactory.clones[j]);
				} else if (player1BRDistToCenter <= cloneDist1 || player1BRDistToCenter <= cloneDist2) {
					playerLaser.disappear(player1Ship, playerLaser);
					game.die(cloneFactory.clones[j]);
				}
			}
		} else {
			for (let k = 0; k < mothershipFactory.motherships.length; k++) {
				let playerLaser = player1Ship.shotsFired[i];
				let x1 = player1Ship.shotsFired[i].x;
				let y1 = player1Ship.shotsFired[i].y;
				let width1 = player1Ship.shotsFired[i].width;
				let height1 = player1Ship.shotsFired[i].height;
				let x2 = mothershipFactory.motherships[k].body.x;
				let y2 = mothershipFactory.motherships[k].body.y;
				let xPlayer1Center = x1 + (width1 / 2);
				let yPlayer1Center = y1 + (height1 / 2)
				let xMothershipCenter = x2 + (mothershipFactory.motherships[k].body.width / 2);
				let yMothershipCenter = y2 + (mothershipFactory.motherships[k].body.height / 2);
				// let distance = getDistance(x1, y1, x2, y2);
				let player1TLDistToCenter = getDistance(x1, y1, xMothershipCenter, yMothershipCenter);
				let player1TRDistToCenter = getDistance(x1 + width1, y1, xMothershipCenter, yMothershipCenter);
				let player1BLDistToCenter = getDistance(x1, y1 + height1, xMothershipCenter, yMothershipCenter);
				let player1BRDistToCenter = getDistance(x1 + width1, y1 + height1, xMothershipCenter, yMothershipCenter);
				// while using the center point of the alien ships, I only need to measure two distances for comparison:
				let mothershipDist1 = getDistance(x2, y2, xMothershipCenter, yMothershipCenter);
				let mothershipDist2 = getDistance(x2, y2 + mothershipFactory.motherships[k].body.height, xMothershipCenter, yMothershipCenter);
				
				if (player1TLDistToCenter <= mothershipDist1 || player1TLDistToCenter <= mothershipDist2) {
					playerLaser.disappear(player1Ship, playerLaser);
					mothershipFactory.motherships[k].shield--;
					$("#enemies-left").text("Shield: " + mothershipFactory.motherships[k].shield);
					if (mothershipFactory.motherships[k].shield === 0) {
						game.killMothership(mothershipFactory.motherships[k]);
					}
				} else if (player1TRDistToCenter <= mothershipDist1 || player1TRDistToCenter <= mothershipDist2) {
					playerLaser.disappear(player1Ship, playerLaser);
					mothershipFactory.motherships[k].shield--;
					$("#enemies-left").text("Shield: " + mothershipFactory.motherships[k].shield);
					if (mothershipFactory.motherships[k].shield === 0) {
						game.killMothership(mothershipFactory.motherships[k]);
					}
				} else if (player1BLDistToCenter <= mothershipDist1 || player1BLDistToCenter <= mothershipDist2) {
					playerLaser.disappear(player1Ship, playerLaser);
					mothershipFactory.motherships[k].shield--;
					$("#enemies-left").text("Shield: " + mothershipFactory.motherships[k].shield);
					if (mothershipFactory.motherships[k].shield === 0) {
						game.killMothership(mothershipFactory.motherships[k]);
					}
				} else if (player1BRDistToCenter <= mothershipDist1 || player1BRDistToCenter <= mothershipDist2) {
					playerLaser.disappear(player1Ship, playerLaser);
					mothershipFactory.motherships[k].shield--;
					$("#enemies-left").text("Shield: " + mothershipFactory.motherships[k].shield);
					if (mothershipFactory.motherships[k].shield === 0) {
						game.killMothership(mothershipFactory.motherships[k]);
					}
				}
			}
		}
	}
	cancelMe2 = requestAnimationFrame(animatePlayerFire);
}
animatePlayerFire();

// let amountClones = 10;
// const initClones = (numClones) => {
// 	for (let i = 0; i < amountClones; i++) {
// 	cloneFactory.generateClone(new Clone());
// 	cloneFactory.clones[i].initialize();
// 	// cloneFactory.clones[i].initLaser();
// 	}
// }
// initClones(amountClones);

const animateClone = () => {
	for (let j = 0; j < cloneFactory.clones.length; j++) {
		cloneFactory.clones[j].update();
		cloneFactory.clones[j].draw();
		cloneFactory.clones[j].move();

		const randomNumber = Math.floor(Math.random() * 100);
		if(randomNumber === 26) {
			cloneFactory.clones[j].fire();
		}		
	
		for(let k = 0; k < cloneFactory.clones[j].shotsFired.length; k++) {
			let enemyLaser = cloneFactory.clones[j].shotsFired[k];
			enemyLaser.draw();
			enemyLaser.move();
			let x3 = enemyLaser.x;
			let y3 = enemyLaser.y;
			let width3 = enemyLaser.width;
			let height3 = enemyLaser.height;

			let x2 = player1Ship.body.x;
			let y2 = player1Ship.body.y;
			let xLaserCenter = x3 + (width3 / 2);
			let yLaserCenter = y3 + (height3 / 2);

			let xPlayer1Center = x2 + (player1Ship.body.width / 2);
			let yPlayer1Center = y2 + (player1Ship.body.height / 2);
			// let distance = getDistance(x1, y1, x2, y2);
			let laserTLDistToCenter = getDistance(x3, y3, xPlayer1Center, yPlayer1Center);
			let laserTRDistToCenter = getDistance(x3 + width3, y3, xPlayer1Center, yPlayer1Center);
			let laserBLDistToCenter = getDistance(x3, y3 + height3, xPlayer1Center, yPlayer1Center);
			let laserBRDistToCenter = getDistance(x3 + width3, y3 + height3, xPlayer1Center, yPlayer1Center);
			// while using the center point of the alien ships, I only need to measure two distances for comparison:
			let player1Dist1 = getDistance(x2, y2, xPlayer1Center, yPlayer1Center);
			let player1Dist2 = getDistance(x2, y2 + player1Ship.body.height, xPlayer1Center, yPlayer1Center);

			// if alien shoots player
			if (laserTLDistToCenter <= player1Dist1 || laserTLDistToCenter <= player1Dist2) {
				enemyLaser.disappear(cloneFactory.clones[j], enemyLaser);
				game.die(player1Ship);
			} else if (laserTRDistToCenter <= player1Dist1 || laserTRDistToCenter <= player1Dist2) {
				enemyLaser.disappear(cloneFactory.clones[j], enemyLaser);
				game.die(player1Ship);
			} else if (laserBLDistToCenter <= player1Dist1 || laserBLDistToCenter <= player1Dist2) {
				enemyLaser.disappear(cloneFactory.clones[j], enemyLaser);
				game.die(player1Ship);
			} else if (laserBRDistToCenter <= player1Dist1 || laserBRDistToCenter <= player1Dist2) {
				enemyLaser.disappear(cloneFactory.clones[j], enemyLaser);
				game.die(player1Ship);
			}
		}

		let x1 = cloneFactory.clones[j].body.x;
		let y1 = cloneFactory.clones[j].body.y;
		let width1 = cloneFactory.clones[j].body.width;
		let height1 = cloneFactory.clones[j].body.height;

		let x2 = player1Ship.body.x;
		let y2 = player1Ship.body.y;
		let xCloneCenter = x1 + (width1 / 2);
		let yCloneCenter = y1 + (height1 / 2);

		let xPlayer1Center = x2 + (player1Ship.body.width / 2);
		let yPlayer1Center = y2 + (player1Ship.body.height / 2);
		// let distance = getDistance(x1, y1, x2, y2);
		let cloneTLDistToCenter = getDistance(x1, y1, xPlayer1Center, yPlayer1Center);
		let cloneTRDistToCenter = getDistance(x1 + width1, y1, xPlayer1Center, yPlayer1Center);
		let cloneBLDistToCenter = getDistance(x1, y1 + height1, xPlayer1Center, yPlayer1Center);
		let cloneBRDistToCenter = getDistance(x1 + width1, y1 + height1, xPlayer1Center, yPlayer1Center);
		// while using the center point of the alien ships, I only need to measure two distances for comparison:
		let player1Dist1 = getDistance(x2, y2, xPlayer1Center, yPlayer1Center);
		let player1Dist2 = getDistance(x2, y2 + player1Ship.body.height, xPlayer1Center, yPlayer1Center);
		
		// if alien and player crash into each other
		if (cloneTLDistToCenter <= player1Dist1 || cloneTLDistToCenter <= player1Dist2) {
			game.die(cloneFactory.clones[j]);
			game.die(player1Ship);
		} else if (cloneTRDistToCenter <= player1Dist1 || cloneTRDistToCenter <= player1Dist2) {
			game.die(cloneFactory.clones[j]);
			game.die(player1Ship);
		} else if (cloneBLDistToCenter <= player1Dist1 || cloneBLDistToCenter <= player1Dist2) {
			game.die(cloneFactory.clones[j]);
			game.die(player1Ship);
		} else if (cloneBRDistToCenter <= player1Dist1 || cloneBRDistToCenter <= player1Dist2) {
			game.die(cloneFactory.clones[j]);
			game.die(player1Ship);
		}
		
	}// for all clones
	cancelMe3 = requestAnimationFrame(animateClone);
}
animateClone();

const animateMothership = () => {
	for (let j = 0; j < mothershipFactory.motherships.length; j++) {
		mothershipFactory.motherships[j].update();
		mothershipFactory.motherships[j].draw();
		mothershipFactory.motherships[j].move();

		const randomNumber = Math.floor(Math.random() * 30);
		if(randomNumber === 26) {
			mothershipFactory.motherships[j].fire();
		}		
	
		for(let k = 0; k < mothershipFactory.motherships[j].shotsFired.length; k++) {
			let enemyLaser = mothershipFactory.motherships[j].shotsFired[k];
			enemyLaser.draw();
			enemyLaser.move();
			let x3 = enemyLaser.x;
			let y3 = enemyLaser.y;
			let width3 = enemyLaser.width;
			let height3 = enemyLaser.height;

			let x2 = player1Ship.body.x;
			let y2 = player1Ship.body.y;
			let xLaserCenter = x3 + (width3 / 2);
			let yLaserCenter = y3 + (height3 / 2);

			let xPlayer1Center = x2 + (player1Ship.body.width / 2);
			let yPlayer1Center = y2 + (player1Ship.body.height / 2);
			// let distance = getDistance(x1, y1, x2, y2);
			let laserTLDistToCenter = getDistance(x3, y3, xPlayer1Center, yPlayer1Center);
			let laserTRDistToCenter = getDistance(x3 + width3, y3, xPlayer1Center, yPlayer1Center);
			let laserBLDistToCenter = getDistance(x3, y3 + height3, xPlayer1Center, yPlayer1Center);
			let laserBRDistToCenter = getDistance(x3 + width3, y3 + height3, xPlayer1Center, yPlayer1Center);
			// while using the center point of the alien ships, I only need to measure two distances for comparison:
			let player1Dist1 = getDistance(x2, y2, xPlayer1Center, yPlayer1Center);
			let player1Dist2 = getDistance(x2, y2 + player1Ship.body.height, xPlayer1Center, yPlayer1Center);

			// if mothership shoots player
			if (laserTLDistToCenter <= player1Dist1 || laserTLDistToCenter <= player1Dist2) {
				enemyLaser.disappearMS(mothershipFactory.motherships[j], enemyLaser);
				game.die(player1Ship);
			} else if (laserTRDistToCenter <= player1Dist1 || laserTRDistToCenter <= player1Dist2) {
				enemyLaser.disappearMS(mothershipFactory.motherships[j], enemyLaser);
				game.die(player1Ship);
			} else if (laserBLDistToCenter <= player1Dist1 || laserBLDistToCenter <= player1Dist2) {
				enemyLaser.disappearMS(mothershipFactory.motherships[j], enemyLaser);
				game.die(player1Ship);
			} else if (laserBRDistToCenter <= player1Dist1 || laserBRDistToCenter <= player1Dist2) {
				enemyLaser.disappearMS(mothershipFactory.motherships[j], enemyLaser);
				game.die(player1Ship);
			}
		}	
	}
	cancelMe4 = requestAnimationFrame(animateMothership);
}

