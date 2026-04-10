//Canvas Functions

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var backgroundColor = "rgb(100, 100, 245)";

class Square{
    constructor(x, y, height, width, color, speedX = 0, speedY = 0)
    {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }
}

var player = new Square(50, 50, 20, 20, "rgb(0, 0, 0)");
var enemy = new Square(100, 100, 50, 50, "rgb(300, 300, 300)", 2, 2);

//Create an Array for Objects
let squares = [];
squares.push(player);
squares.push(enemy);

var keys = {};

document.addEventListener("keydown", function(e) {
    keys[e.key] = true;
});

document.addEventListener("keyup", function(e) {
    keys[e.key] = false;
});

setInterval(update, 1000 / 60);

function update() {

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys["w"]) player.y -= 5;
    if (keys["s"]) player.y += 5;
    if (keys["a"]) player.x -= 5;
    if (keys["d"]) player.x += 5;

    // Keep player in bounds
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;

    // Bounce off walls
    if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
        enemy.speedX *= -1;
    }
    if (enemy.y <= 0 || enemy.y + enemy.height >= canvas.height) {
        enemy.speedY *= -1;
    }

    //Check for Collision in Array
    for (let i = 0; i < squares.length; i++) {
        let other = squares[i];
    
        if (other !== player && hasCollided(player, other)) {
            handleCollision();
        }
    }

    draw();
}

function draw() {
    // Background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw all squares using loop
    for (let i = 0; i < squares.length; i++) {
        let sq = squares[i];
        ctx.fillStyle = sq.color;
        ctx.fillRect(sq.x, sq.y, sq.width, sq.height);
    }
}

function hasCollided(obj1, obj2) {
    return !(
        obj1.y + obj1.height < obj2.y ||
        obj1.y > obj2.y + obj2.height ||
        obj1.x + obj1.width < obj2.x ||
        obj1.x > obj2.x + obj2.width
    );
}

function handleCollision() {
    // Change background
    backgroundColor = "red";

    // Grow objects
    player.width = 40;
    player.height = 40;
    enemy.width = 80;
    enemy.height = 80;

    // Reset after short delay
    setTimeout(() => {
        backgroundColor = "rgb(100, 100, 245)";
        player.width = 20;
        player.height = 20;
        enemy.width = 50;
        enemy.height = 50;
    }, 200);
}