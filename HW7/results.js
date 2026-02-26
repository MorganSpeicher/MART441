//Creates variable and stores the JSON data, looks for "playerData" returns and stores what was saved
const playerJSON = localStorage.getItem("playerData");

//Checks for data stored
//Turns string back into a JS object
//Replaces content for what was stored and updates the DOM
if (playerJSON) {
    const player = JSON.parse(playerJSON);

    document.getElementById("results").innerHTML = `
    <p><strong>Name:</strong> ${player.firstName} ${player.lastName}</p>
    <p><strong>Age:</strong> ${player.age}</p>
    <p><strong>Total Attempts:</strong> ${player.attempts}</p>
    `;
}
//If no data was found re-route back to start page
else {
    alert("No data found.");
    window.location.href = "../introduction.html";
}