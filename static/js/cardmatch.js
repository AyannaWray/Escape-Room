const gridContainer = document.querySelector(".grid-container")

let cards = [];
let cardone, cardtwo;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

//Fetch allows you th pull the data stored in the json file
fetch("static/data/cards.json")
    //turns the json into a javascrpit obj
    .then((res) => res.json())
    //Copy data into the cards array
    .then((data) => {
        cards = [...data, ...data];
        shuffleCards();
        generateCards();
    });

//Uses the Fisher-Yates Algorithm
function shuffleCards() {
    //Set the current index the the cards array length
    let currIndex = cards.length;
    let randomIndex, tempVal;

    //Loop through the array
    while (currIndex !== 0) {
        //pick random index from the amout of cards left in the array
        randomIndex = Math.floor(Math.random() * currIndex);
        //Decrease current index
        currIndex -= 1;
        //Swap the items held in these indexes
        tempVal = cards[currIndex];
        cards[currIndex] = cards[randomIndex];
        cards[randomIndex] = tempVal;
    }
}

    
function generateCards() {
    for (let card of cards) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card")
        //set card name to the name set in the json file
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
        <div class="front">
            <img class="front-image" src="${card.image}">
        </div>

        <div class="back"></div>
        `;
        //Add cards to the grid container
        gridContainer.appendChild(cardElement);

        //EventListener for when card is flipped
        cardElement.addEventListener("click", flipCard);
    }
}
function flipCard() {
    //If the board is locked, stop the function
    if (lockBoard) return;
    //Prevents a card from being selected more than once
    if (this == cardone) return;
    this.classList.add("flipped");

    if (!cardone) {
        //stored selected card in first card
        cardone = this;
        return;
    }
    //second card selected stored for comparison
    cardtwo = this;
    lockBoard = true; 

    checkForMatch();
    }
    

function checkForMatch() {
    //Compare the cards to see if they match
    let isMatch = cardone.dataset.name == cardtwo.dataset.name;
    if (isMatch == true) {
        score++
    }
    document.querySelector(".score").textContent = score;
    //If matched call the disable function otherwise unflip the cards
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    //make it so when user clicks on card nothing happens
    // cardone.removeEventListener("click", flipCard);
    // cardtwo.removeEventListener("click", flipCard);
    // cardone.classList.remove("flipped");
    // cardtwo.classList.remove("flipped");

    resetBoard();
}

function unflipCards() {
    //Set timer to allow player to see the cards 1 sec
    setTimeout(() => {
        //flip cards back over
        // cardone.removeEventListener("click", flipCard);
        // cardtwo.removeEventListener("click", flipCard);
        cardone.classList.remove("flipped");
        cardtwo.classList.remove("flipped");

        resetBoard();
    }, 1000);
}

function resetBoard() {
    cardone = null;
    cardtwo = null;
    lockBoard = false;
}

function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    generateCards();
}

