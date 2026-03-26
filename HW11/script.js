$(document).ready(function() {

    // jQuery AJAX to load JSON
    $.getJSON("HW11/data.json", function(data) {

        // Function that lopps through each streamer data object
        data.streamers.forEach(function(streamer) {
            $("#output").append(`
                <div class="card">
                    <h2>${streamer.name}</h2>
                    <p>Watch Time: ${streamer.watchTime}</p>
                    <p>Followers: ${streamer.followers}</p>
                </div>
            `);
        });

        // Applies the plug-in to all "cards"
        $(".card").hoverHighlight();
    });

    // jQuery plugin for hover highlight
    $.fn.hoverHighlight = function() {
        return this.hover(
            function() { $(this).css("background-color", "rgb(114, 88, 64)"); },
            function() { $(this).css("background-color", "rgb(64, 44, 25)"); }
        );
    };

});
