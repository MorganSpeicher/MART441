function showText() {
    const block = document.querySelector('.headerBlockTextAdventure');
    block.textContent = "Welcome to the Adventure!";
}

showText();

function stepOne() {
    var block = document.querySelector('.blockTextAdventure');
    block.textContent = "You roll up onto a sandy beach early in the morning, you had just taken a nap on the sea floor and are unsure what to do with the rest of your day."

}

setTimeout (stepOne, 15000);

function askUser() {
    const block = document.querySelector('.blockTextAdventure');
    block.textContent = 
    "What do you choose to do for the rest of the morning?\n" +
    "You may: (1) Bask in the sun,\n" +
    "You may: (2) Go back into the ocean to catch and eat fish,\n" +
    "You may: (3) Or converse with your other seal friends who are galumphing up on the shore.";
}

setTimeout (askUser, 20000);



setTimeout(function() {
    const block = document.querySelector('.blockTextAdventure');
    var answer = prompt("What do you choose to do for the rest of the morning?");

    if(answer == "1") {
        block.textContent = 'You bask in the sun for the rest of the afternoon, feeling very warm and very happy. You let out a "gyu!" in response. Refresh the page to start over.';
    } 
    else if(answer == "2") {
        block.textContent = "You go back to the ocean and eat some yummy fish!";
        
        setTimeout (function askUserFish() {
            var fish = 1
            const block = document.querySelector('.blockTextAdventure');
            block.textContent = 
            "Do you wish to eat more fish?\n" +
            "(1) Yes or (2) No";

            setTimeout(function() {
                const block = document.querySelector('.blockTextAdventure');
                var answer = prompt("Do you eat more yummy fish?");

                if (answer == "1") {
                    fish++;
                    block.textContent = "You ate one more fish! You now have eaten" + " " + fish + " " + "fish! Refresh the page to start over.";
                }
                else if (answer == "2") {
                    block.textContent = "You ate some fish! You now have eaten " + fish + " fish! Refresh the page to start over.";
                }
                else {
                    block.textContent = "Please choose an option! Refresh the page to start over.";
                }

            }, 3000);
        }, 3000);

        askUserFish ();

    }
    else if(answer == "3") {
        block.textContent = "You galumph over to your other seal friends on the shore and chat the morning away! Refresh the page to start over.";
    }
    else {
        block.textContent = "Please choose an option! Refresh the page to start over.";
    }
}, 26000);