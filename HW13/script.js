//Canvas Functions

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var backgroundColor = "rgb(99, 132, 106)";

//Arrays
let obstacles = [];
let collectibles = [];
let player;
let score = 0;

//Classes
class Obstacle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

class Collectible {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.active = true;
    }
}

class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

//Load JSON for Obstacles and Player and add to array
$.getJSON("HW13/data.json", function(data) {
    data.squares.forEach(obj => {

        if (obj.type === "player") {
            player = new Player(obj.x, obj.y, obj.width, obj.height, obj.color);
        } else {
            obstacles.push(new Obstacle(obj.x, obj.y, obj.width, obj.height, obj.color));
        }

    });

    setInterval(update, 1000 / 60);
});

//Load JSON for Collectibles and add to array
$.getJSON("HW13/collectibles.json", function(data) {
    data.collectibles.forEach(obj => {
        collectibles.push(new Collectible(
            obj.x,
            obj.y,
            obj.width,
            obj.height,
            obj.color
        ));
    });
});

//Input Key Listeners
var keys = {};

document.addEventListener("keydown", function(e) {
    keys[e.key] = true;
});

document.addEventListener("keyup", function(e) {
    keys[e.key] = false;
});

//Main Game Functions
function update() {

    if (!player) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Player Movement

    // Move in X direction
    let prevX = player.x;
    if (keys["ArrowRight"]) player.x += 5;
    if (keys["ArrowLeft"]) player.x -= 5;

    //Keep in bounds (X)
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

    // Check X collisions
    for (let other of obstacles) {
        if (hasCollided(player, other)) {
            player.x = prevX;
            break;
        }
    }

    //Move in Y direction
    let prevY = player.y;
    if (keys["ArrowDown"]) player.y += 5;
    if (keys["ArrowUp"]) player.y -= 5;

    //Keep in bounds (Y)
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

    //Check Y collisions
    for (let other of obstacles) {
        if (hasCollided(player, other)) {
            player.y = prevY;
            break;
        }
    }

    //Check Collectible collisions
    for (let item of collectibles) {
        if (item.active && hasCollided(player, item)) {
            item.active = false;
            score += 1;
        }
    }
 

    draw();
}

function draw() {
    //Background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Draw obstacles
    for (let obs of obstacles) {
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }

    //Draw collectibles
    for (let item of collectibles) {
        if (item.active) {
            ctx.fillStyle = item.color;

            ctx.beginPath();
            ctx.arc(
                item.x + item.width / 2,
                item.y + item.height / 2,
                item.width / 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    }

    //Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    //Draw score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 30);
}

//Checks Colision of Player with Collectible
function hasCollided(obj1, obj2) {
    return !(
        obj1.y + obj1.height < obj2.y ||
        obj1.y > obj2.y + obj2.height ||
        obj1.x + obj1.width < obj2.x ||
        obj1.x > obj2.x + obj2.width
    );
}