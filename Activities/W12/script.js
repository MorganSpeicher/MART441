function updateAudio() {
    var audio = document.getElementById("song");
    audio.src = "Boing.mp3";
}

var x = 50;
var y = 50;

window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d"); 

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // move only if not at the edge
        if (x < canvas.width - 10) {
            x += 2;
        }

        ctx.fillStyle = "#0000FF";
        ctx.fillRect(x, y, 10, 10);
    }

    setInterval(draw, 30);
};