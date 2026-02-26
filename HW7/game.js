// Variable to store "blank" tile images
var blankImages = [];
// Variable to store the seal images
var actualImages = [];
// Image path for the "blank" tile
var blankImagePath = "images/pinkFlower.jpg";

//Variables for Game Logic
var firstSelection = null;
var secondSelection = null;
var lockBoard = false;
var attempts = 0;
var matchesFound = 0;

// Call function to load the game, calls the other functions
function printTiles() {
    createArrays();
    displayBoard();
}

// Function that creates the arrays for the blank and seal images
function createArrays() {
    blankImages = [];
    actualImages = [];

    // Variable that links all base seal images
    var baseImages = [
        "images/seal1.jpeg",
        "images/seal2.jpeg",
        "images/seal3.jpeg",
        "images/seal4.jpeg",
        "images/seal5.jpeg",
        "images/seal6.jpeg"
    ];

    // For loop that creates a duplicate image for each base file and stores it in the array
    for(var i = 0; i < baseImages.length; i++) {
        actualImages.push(baseImages[i]);
        actualImages.push(baseImages[i]);
    }

    // For loop to shuffle the images in the array by starting the loop at the last index, pick a random index before it by using Math.random,
    // swaps those arrays for each other and repeats. I used Gen AI to help me with this one.
    for(var i = actualImages.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = actualImages[i];
        
        actualImages[i] = actualImages[j];
        actualImages[j] = temp;
    }

    // For loop that fills the array with 12 versions of the "blank" linked image through push and increment
    for(var i = 0; i < 12; i++) {
        blankImages.push(blankImagePath);
    }
}

// Gets the board div and clears it
function displayBoard() {
    var board = document.getElementById("gameBoard");
    
    board.innerHTML = "";
    
    // Loops through blank images in the array and adds them to the game board, attaches onclick and passes index number through the loop
    for(var i = 0; i < blankImages.length; i++) {
        board.innerHTML +=
        "<img src='" + blankImages[i] +
        "' width='200' height='150' onclick='flipImage(" + i + ")'>";
    }
}

// Function that assigns an index for each tile that was clicked, fills the game board, and updates the DOM to the base image for each blank image clicked
function flipImage(index) {
    //Prevents extra clicks if the player gets the tiles wrong
    if (lockBoard) return;

    var board = document.getElementById("gameBoard").getElementsByTagName("img");

    //Checks to make sure the same tile cannot be clicked twice. Checks to see if the correct tile image is already "face-up"/correct
    if (board[index].src.includes(actualImages[index])) return;

    //"Flips"/changes the tile when it is clicked
    board[index].src = actualImages[index];

    //Checks for and if true assigns the first click as such
    if (firstSelection === null) {
        firstSelection = index;
    }
    //Checks for and if true assigns the second click as such
    //Stores the second tile and locks those tiles so they cannot be flipped over again
    else {
        secondSelection = index;
        lockBoard = true;
        
        //Increases the amount of attemps after a failed match and updates the DOM
        attempts++;
        document.getElementById("attemptCounter").innerText = attempts;

        //Compares the image paths to check for a match
        //Reset selections and check if all tiles have been matched
        if (actualImages[firstSelection] === actualImages[secondSelection]) {
            matchesFound++;
            resetTurn();
            checkGameEnd();
        }
        //If they are not a match set a delay and reset the image paths and reset turn variables
        else {
            setTimeout(function() {
                board[firstSelection].src = blankImagePath;
                board[secondSelection].src = blankImagePath;
                resetTurn();
            }, 800);
        }
    }
}

//Resets variables
function resetTurn() {
    firstSelection = null;
    secondSelection = null;
    lockBoard = false;
}

//Checks to see if the game will end, if the number of matches equals 6 the number of attemps is stored, then converted to a string,
//Player is then directed to the results page after a delay
function checkGameEnd() {
    if (matchesFound === 6) {
        var player = JSON.parse(localStorage.getItem("playerData"));

        player.attempts = attempts;

        localStorage.setItem("playerData", JSON.stringify(player));

        setTimeout(function () {
            window.location.href = "results.html";
        }, 1000);
    }
}