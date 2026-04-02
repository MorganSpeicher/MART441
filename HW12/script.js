//Colorfull Background

var isColorCycling = false;
var hue = 0; // starting hue



//Audio

function playAudio() {
    var audio = document.getElementById("song");
    audio.src = "HW12/Jiggy.mp3";
    audio.loop = true;
    audio.play();

    // start background color cycling
    isColorCycling = true;
}

//Canvas Functions

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var backgroundColor = "rgb(220, 245, 245)";

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

var player = new Square(50, 50, 20, 20, "rgb(51, 76, 150)");
var enemy = new Square(100, 100, 50, 50, "rgb(135, 85, 130)", 2, 2);

var keys = {};

document.addEventListener("keydown", function(e) {
    keys[e.key] = true;
});

document.addEventListener("keyup", function(e) {
    keys[e.key] = false;
});

setInterval(update, 1000 / 60);

function update() {
    // cycle background if enabled
    if (isColorCycling) {
        hue += 0.5; // change speed here
        if (hue > 360) hue = 0;
        document.body.style.backgroundColor = `hsl(${hue}, 70%, 80%)`;
    }

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

    if (hasCollided(player, enemy)) {
        handleCollision();
    }

    draw();
}

function draw() {
    // Background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Enemy
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
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
        backgroundColor = "rgb(220, 245, 245)";
        player.width = 20;
        player.height = 20;
        enemy.width = 50;
        enemy.height = 50;
    }, 200);
}