const modal = document.getElementById("game_modal");
const closeModal = document.getElementById("close_modal");

const gameTitle = document.getElementById("game-title");
const gameContent = document.getElementById("game-content");

const gameButtons = document.querySelectorAll(".game_btn");


gameButtons.forEach(button => {

    button.addEventListener("click", () => {

        const gameNum = button.dataset.game;

        switch (gameNum) {

            case "1":
                gameTitle.textContent = "Memory Cards";
                gameContent.innerHTML = `
                    <iframe
                    src= "/cardindex"
                    class="card-game-frame">
                    </iframe>
                `;
                break;


            case "2":
                gameTitle.textContent = "Game 2";
                gameContent.innerHTML = `
                    <iframe
                    src= "/paclady"
                    class="paclady-frame">
                    </iframe>
                `;
                break;


            case "3":
                gameTitle.textContent = "Game 3";
                gameContent.innerHTML = `
                    <p>This is Game 3!</p>
                    <button>Start Game 3</button>
                `;
                break;


            case "4":
                gameTitle.textContent = "Game 4";
                gameContent.innerHTML = `
                    <p>This is Game 4!</p>
                    <button>Start Game 4</button>
                `;
                break;


            case "5":
                gameTitle.textContent = "Game 5";
                gameContent.innerHTML = `
                    <p>This is Game 5!</p>
                    <button>Start Game 5</button>
                `;
                break;


            case "6":
                gameTitle.textContent = "Game 6";
                gameContent.innerHTML = `
                    <p>This is Game 6!</p>
                    <button>Start Game 6</button>
                `;
                break;
        }

        modal.style.display = "flex";

    });

});


closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});