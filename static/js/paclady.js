//board
let board;

const rowCount = 21;
const colunmCount = 19;
const tileSize = 18;
const boardWidth = colunmCount * tileSize;
const boardHeight = rowCount * tileSize;
let context;

//image variables
let purpleGhostImg;
let blueGhostImg;
let pinkGhostImg;
let redGhostImg;
let yellowGhostImg;
let PacladydownImg;
let PacladyrightImg;
let PacladyleftImg;
let PacladyUpImg;
let fenceImg;

//use set insted of array becuase a set can't have any dplicate
const fences = new Set();
const foods = new Set();
const ghosts = new Set();
let paclady;

const direction = ['U', 'D', 'L', 'R']; //up, down, right, left

let score = 0;
let lives = 3;
let gameOver = false;

//X = wall, O = skip, P = pac man, ' ' = food
//Ghosts: b = blue, o = orange, p = pink, r = red, y = yellow
const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXyXX X XXXX",
    "        bpr        ",
    "XXXX X XX XX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX"
];

window.onload = function () {
    board = this.document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // draws on the board

    loadImages();
    loadMap();

    for (let ghost of ghosts.values()) {
        const newDirection = direction[Math.floor(Math.random() * 4)];
        ghost.updateDirection(newDirection);
    }

    update();
    this.document.addEventListener("keydown", movePaclady);
};

function loadImages() {
    fenceImg = new Image();
    fenceImg.src = "static/images/paclady_img/fence.png";

    purpleGhostImg = new Image();
    purpleGhostImg.src = "static/images/paclady_img/ghostpurple.png";

    blueGhostImg = new Image();
    blueGhostImg.src = "static/images/paclady_img/ghostblue.png";

    pinkGhostImg = new Image();
    pinkGhostImg.src = "static/images/paclady_img/ghostpink.png";

    redGhostImg = new Image();
    redGhostImg.src = "static/images/paclady_img/ghostred.png";

    yellowGhostImg = new Image();
    yellowGhostImg.src = "static/images/paclady_img/ghostyellow.png";

    PacladydownImg = new Image();
    PacladydownImg.src = "static/images/paclady_img/pacladydown.png";

    PacladyrightImg = new Image();
    PacladyrightImg.src = "static/images/paclady_img/pacladyright.png";

    PacladyleftImg = new Image();
    PacladyleftImg.src = "static/images/paclady_img/pacladyleft.png";

    PacladyUpImg = new Image();
    PacladyUpImg.src = "static/images/paclady_img/pacladyup.png";
}

//create the tile map
//this function is also used for resetting the game
function loadMap() {
    fences.clear();
    foods.clear();
    ghosts.clear();

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colunmCount; c++) {
            const row = tileMap[r];
            const tileMapChar = row[c];

            //Scale by tileSize
            const x = c * tileSize;
            const y = r * tileSize;

            //draw fence if tileMapChar = X
            if (tileMapChar == 'X') {
                const fence = new Block(fenceImg, x, y, tileSize, tileSize);
                fences.add(fence);
            }
            //draw red ghost if tileMapChar = r
            else if (tileMapChar == 'r') {
                const ghost = new Block(redGhostImg, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            //draw blue ghost if tileMapChar = b
            else if (tileMapChar == 'b') {
                const ghost = new Block(blueGhostImg, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            //draw pink ghost if tileMapChar = p
            else if (tileMapChar == 'p') {
                const ghost = new Block(pinkGhostImg, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            //draw yellow ghost if tileMapChar = y
            else if (tileMapChar == 'y') {
                const ghost = new Block(yellowGhostImg, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            //draw Paclady if tileMapChar = P
            else if (tileMapChar == 'P') {
                paclady = new Block(PacladyrightImg, x, y, tileSize, tileSize);
            }
            //draw food if tileMapChar = ' '
            else if (tileMapChar == ' ') {
                const food = new Block(null, x + 7, y + 7, 4, 4);
                foods.add(food);
            }
        }
    }
}

//game loop
function update() {
    if (!gameOver) {
        move();
    }
    draw();
    setTimeout(update, 50); //calls update function every 50ms
}

function draw() {
    //clears wht was drawn in the previous frame
    context.clearRect(0, 0, board.width, board.height);

    //draw paclady
    context.drawImage(paclady.image, paclady.x, paclady.y, paclady.width, paclady.height);

    //draw ghosts
    for (let ghost of ghosts.values()) {
        context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
    }

    //draw fence
    for (let fence of fences.values()) {
        context.drawImage(fence.image, fence.x, fence.y, fence.width, fence.height);
    }

    //Draw a rectangle for food
    context.fillStyle = "#ffc0cb";
    for (let food of foods.values()) {
        context.fillRect(food.x, food.y, food.width, food.height);
    }

    //Update Score
    context.fillStyle = "white";
    context.font = "bold 14px sans-serif";
    if (gameOver) {
        context.fillText("Game Over: " + String(score), tileSize / 2, tileSize / 2);
    } else {
        context.fillText("x" + String(lives) + " " + String(score), tileSize / 2, tileSize / 2);
    }
}

//Handles all the movement for the game
function move() {
    paclady.x += paclady.velocityX;
    paclady.y += paclady.velocityY;

    //make paclady appear on opposing side when they go offscreen
    if (paclady.x + paclady.width < 0) {
        paclady.x = boardWidth;
    }
    if (paclady.x > boardWidth) {
        paclady.x = -paclady.width;
    }

    // check for fence collisions
    for (let fence of fences.values()) {
        if (collision(paclady, fence)) {
            //take a step backward if collision occours
            paclady.x -= paclady.velocityX;
            paclady.y -= paclady.velocityY;
            break;
        }
    }

    //move ghosts
    for (let ghost of ghosts.values()) {
        ghost.x += ghost.velocityX;
        ghost.y += ghost.velocityY;

        //make ghost appear on opposing side when they go offscreen
        if (ghost.x + ghost.width < 0) {
            ghost.x = boardWidth;
        }
        if (ghost.x > boardWidth) {
            ghost.x = -ghost.width;
        }

        //force ghost to go up
        if (ghost.y == tileSize * 9 && ghost.direction != 'U' && ghost.direction != 'D') {
            ghost.updateDirection('U');
        }

        //Check for collisions between ghost and paclady
        if (collision(ghost, paclady)) {
            lives -= 1;
            if (lives == 0) {
                gameOver = true;
            } else {
                resetPositions();
            }
        }

        //Check for fence collisions for ghosts
        for (let fence of fences.values()) {
            if (collision(ghost, fence)) {
                //take a step backward if collision occours
                ghost.x -= ghost.velocityX;
                ghost.y -= ghost.velocityY;

                //Have ghost change direction after hitting the fence
                const newDirection = direction[Math.floor(Math.random() * 4)];
                ghost.updateDirection(newDirection);
            }
        }
    }

    //check food collision
    let foodEaten = null;
    for (let food of foods.values()) {
        if (collision(paclady, food)) {
            foodEaten = food;
            score += 10;
            break;
        }
    }
    if (foodEaten) {
        foods.delete(foodEaten);
    }

    //win condition: all food eaten
    if (foods.size == 0) {
        gameOver = true;
    }
}

function movePaclady(e) {
    if (gameOver) return;

    // if Up or W pressed Paclady goes up
    if (e.code == "ArrowUp" || e.code == "KeyW") {
        paclady.updateDirection('U');
    }
    // if Down or S pressed Paclady goes down
    else if (e.code == "ArrowDown" || e.code == "KeyS") {
        paclady.updateDirection('D');
    }
    // if Left or A pressed Paclady goes left
    else if (e.code == "ArrowLeft" || e.code == "KeyA") {
        paclady.updateDirection('L');
    }
    // if Right or D pressed Paclady goes right
    else if (e.code == "ArrowRight" || e.code == "KeyD") {
        paclady.updateDirection('R');
    }

    //update paclady images
    if (paclady.direction == 'U') {
        paclady.image = PacladyUpImg;
    }
    else if (paclady.direction == 'D') {
        paclady.image = PacladydownImg;
    }
    else if (paclady.direction == 'L') {
        paclady.image = PacladyleftImg;
    }
    else if (paclady.direction == 'R') {
        paclady.image = PacladyrightImg;
    }
}

//Check for collisions
function collision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

//reset positions for ghost and paclady
function resetPositions() {
    paclady.reset();
    paclady.velocityX = 0;
    paclady.velocityY = 0;
    paclady.direction = 'R';
    paclady.image = PacladyrightImg;

    for (let ghost of ghosts.values()) {
        ghost.reset();
        //give each ghost a new direction
        const newDirection = direction[Math.floor(Math.random() * 4)];
        ghost.updateDirection(newDirection);
    }
}

//full game restart
function restart() {
    score = 0;
    lives = 3;
    gameOver = false;
    loadMap();
    resetPositions();
}

class Block {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        //Save straring x and y position of paclady and the ghost becuase they are moving
        this.startX = x;
        this.startY = y;

        this.direction = "R"; //R is default of paclady
        this.velocityX = 0; //to move horizontally
        this.velocityY = 0; //to move vertically
    }

    updateDirection(direction) {
        //save the previous direction
        const prevDirection = this.direction;
        this.direction = direction;
        this.updateVelocity();

        //take a step foward if collision occours
        this.x += this.velocityX;
        this.y += this.velocityY;

        //iterrate through the fences
        for (let fence of fences.values()) {
            if (collision(this, fence)) {
                this.x -= this.velocityX;
                this.y -= this.velocityY;

                //set direction to previous direction
                this.direction = prevDirection;
                this.updateVelocity();
                return;
            }
        }
    }

    updateVelocity() {
        if (this.direction == 'U') {
            this.velocityX = 0;
            this.velocityY = -tileSize / 4;
        }
        else if (this.direction == 'D') {
            this.velocityX = 0;
            this.velocityY = tileSize / 4;
        }
        else if (this.direction == 'L') {
            this.velocityX = -tileSize / 4;
            this.velocityY = 0;
        }
        else if (this.direction == 'R') {
            this.velocityX = tileSize / 4;
            this.velocityY = 0;
        }
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }
}