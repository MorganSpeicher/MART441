//Initialize variables
let gameStep = "start";
let fish = 1;

//Create a function that displays emojis and updates text for how many fish the user decides to eat through a looping function
function fishDisplay(count) {
    let result = "";
    for (let i = 0; i < count; i++) {
        result += "🐟 ";
    }
    return result;
}

//Create a function that initializes the start of the game and resets all elements when restarted
function Start() {
    gameStep = "start";
    fish = 1;
    
    document.getElementById("txtName").value = "";
    document.querySelector('.blockTextAdventure').textContent = "";
    document.getElementById("storyImage").src = "./HW5/images/sealSunBathing.png";

    const block = document.querySelector('.headerBlockTextAdventure');
    const storyBlock = document.querySelector('.blockTextAdventure');
    block.textContent = 'Welcome to the Adventure!';
    storyBlock.textContent = 'Type "Start" in the text box and press submit to start the adventure, or type "Restart" to restart the adventure!';

    block.style.backgroundColor = "black"
    block.style.color = "white"
}

//Call the start function to start the game
Start();

//Containing function that checks true/false statements based off of user input into text field, updates appropriate text based off of answer
function stepOne() {
    const block = document.querySelector('.blockTextAdventure');
    const currentText = document.getElementById("txtName").value;

    //Checks to see if players calls to restart the game, then runs restart function
    if (currentText === "Restart") {
        Start();
        return;
    }

    //if/else statements that check where the player is at in the game and what they enter into the text field, that way the game knows where to send the player next
    if(gameStep === "start" && currentText === "Start") {
        document.getElementById("storyImage").src = "./HW5/images/harpSeal.webp";
        block.textContent = 
        "You roll up onto a sandy beach early in the morning, you had just taken a nap on the sea floor and are unsure what to do with the rest of your day.\n" +
        'Type "Next" in the text box and press submit to move forward.';

        gameStep = "stepOne";
    }
    else if(gameStep === "stepOne" && currentText == "Next") {
        block.textContent = 
        "What do you choose to do for the rest of the morning?\n" +
        "You may: (1) Bask in the sun,\n" +
        "You may: (2) Go back into the ocean to catch and eat fish,\n" +
        "You may: (3) Or converse with your other seal friends who are galumphing up on the shore.";

        gameStep = "choice";
    }
    else if(gameStep === "choice" && currentText === "1") {
        block.textContent = 
        'You bask in the sun for the rest of the afternoon, feeling very warm and very happy. You let out a "gyu!" in response. Type "Restart" to start over.';

        block.style.backgroundColor = "#FFEE8C"
        block.style.color = "black"
    }
    else if(gameStep === "choice" && currentText === "2") {
        block.textContent = "You go back to the ocean and eat some yummy fish!\n" +
        'Type "Forward" in the text box and press submit to move forward.';

        gameStep = "fish";
    }
    else if(gameStep === "fish" && currentText === "Forward") {
        block.textContent = 
        "Do you wish to eat more fish?\n" +
        "(1) Yes or (2) No";

        gameStep = "fishChoice";
    }
    else if(gameStep === "fishChoice" && currentText === "1") {
        fish++;

        document.getElementById("storyImage").src = "./HW5/images/sealEatingFish.jpg";
        block.textContent = "You ate one more fish! You now have eaten " + fish + " fish!\n" +
        fishDisplay(fish) + "Do you wish to eat more fish? (1) Yes or (2) No";

        fishDisplay(fish);
    }
    else if(gameStep === "fishChoice" && currentText === "2") {
        block.textContent = "You ate some fish! You now have eaten " + fish + " fish! " + 'Type "Restart" to start over.';
    }
    else if(gameStep === "choice" && currentText === "3") {
        block.textContent = "You galumph over to your other seal friends on the shore and chat the morning away! " + 'Type "Restart" to start over.';
    }
    else {
        block.textContent = 'Type "Restart" to start over.';
    }
}