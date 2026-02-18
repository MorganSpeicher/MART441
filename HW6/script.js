/* Attempt #1
var imageTags = ["image1", "image2", "image3", "image4", "image5", "image6"];
var blankImagePath = "HW6/images/pinkFlower.jpg";
var actualImages = new Array();
    
function printTiles()
{
    actualImages = [];
    createRandomImageArray();
    for(var i = 0; i < imageTags.length; i++)
    {
        document.getElementById(imageTags[i]).src= blankImagePath;
    }
}

function createRandomImageArray()
{
    var actualImagePath = ["HW6/images/seal1.jpeg", "HW6/images/seal2.jpeg", "HW6/images/seal3.jpeg", "HW6/images/seal4.jpeg", "HW6/images/seal5.jpeg", "HW6/images/seal6.jpeg"];
    var count = new Array(actualImagePath.length).fill(0);

    while(actualImages.length < 12)
    {
        var randomNumber = Math.floor(Math.random() * actualImagePath.length)
        if(count[randomNumber] < 2)
        {
            actualImages.push(actualImagePath[randomNumber]);
            count[randomNumber] = count[randomNumber] + 1;
        }
    }
}

function flipImage(number)
{
    document.getElementById(imageTags[number]).src= actualImages[number];
}
*/

// Attempt #2
// Variable to store "blank" tile images
var blankImages = [];
// Variable to store the seal images
var actualImages = [];
// Image path for the "blank" tile
var blankImagePath = "HW6/images/pinkFlower.jpg";

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
        "HW6/images/seal1.jpeg",
        "HW6/images/seal2.jpeg",
        "HW6/images/seal3.jpeg",
        "HW6/images/seal4.jpeg",
        "HW6/images/seal5.jpeg",
        "HW6/images/seal6.jpeg"
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
    var board = document.getElementById("gameBoard").getElementsByTagName("img");

    board[index].src = actualImages[index];
}