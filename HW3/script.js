/*Three of your favorite websites
Three of your favorite games (digital or physical)
Three of your favorite artists and their cultural importance
A simple question-and-answer interaction using prompt() and console.log() (You do not need to validate the answer)*/

//Prompt the Console with input answers
console.log("Three of my favorite websites are Etsy, The Useless Web, and Artfight!");
console.log("Three of my favorite games are Sky: Children of the Light, Fortnite, and Inscryption!");
console.log("My first favorite artist is Bob Ross, a class I know. Bob Ross is culturally important in so many ways, but one of the biggest ones is how he democratized art by teaching people how to paint through 'The Joy of Painting'.");
console.log("My next favorite artist is Early James, a muscician. Early James, while a newer artsist, has been culturally significant in how he is re-inventing the blues/folk genre with beautiful, poetic lyricism.");
console.log("My third favorite artist is Ansel Adams. Ansel Adamns is culturally significant in how he revolutioned photography as a fine art and how his photographs of Yosemite drastically increased public sentiment towards National Parks and the great outdoors.");

//Define variable for the question being prompted to the user
const question = "What is your favorite color?";
//Defines variable that prompts the user with a dialog box that then stores their answer as a variable than cannot be changed later.
const userAnswer = prompt(question);

//Writes a string in the console that displays the question that was prompted to the user.
console.log("Question asked: " + question);
//Writes a string in the console that displays the answer that the user entered.
console.log("User's answer: " + userAnswer);