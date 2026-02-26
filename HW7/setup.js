//Listens for the button click on the introduction page then starts the startGame function
document.getElementById("startButton").addEventListener("click", startGame);

//Function that starts the game, stores the label inputs from the first page into variables,
//checks for correct inputs in those labels
function startGame() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const age = document.getElementById("age").value.trim();

    if (firstName === "" || lastName === "" || age === "") {
        alert("Please answer all fields.");
        return;
    }

    if (isNaN(age)) {
        alert("Age must be a number.");
        return;
    }

    //Creates an object that stores player first and last name as well as their age and attempts at the game
    const player = {
        firstName: firstName,
        lastName: lastName,
        age: Number(age),
        attempts: 0
    };

    //Stores the object data and turns it into a string
    localStorage.setItem("playerData", JSON.stringify(player));

    //Directs the player to the next page (game page)
    window.location.href = "./HW7/game.html";
}