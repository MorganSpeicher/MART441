$(document).ready(function() {

    //Array of Images used for the Poster
    let images = [
        "./HW9/images/spring.webp",
        "./HW9/images/fall.avif",
        "./HW9/images/winter.webp"
    ];

    //Text array for all of the different phrases
    let textArray = [
        "Spring cycles renewal.",
        "Fall brings the coming of change.",
        "Winter makes us remember what once was.",
        "Nature gives us insight into our own lives.",
        "Each season shows us balance."
    ];

    //Aray of colors used for the squares
    let colors = [
        "#b8d8be",
        "#e69138",
        "#6fa8dc",

    ];

    //Variables that create and set the index to 0
    let imageIndex = 0;
    let textIndex = 0;

    //Function that chagnes and access the season images in the array and animates them left and right after a certain time interval
    //Increases the image index for the array after an image is displayed, if the index is greater than the length of images in the array it sets the index to 0
    //Displays the Image based off of the id and src for whatever index the variable is at
    //Changes the background color of the square based off of its index and fetches it by id
    function changeImage() {
        $("#seasonImage").animate ({
            left: "+=40"
        },2000).animate({
            left: "-=40"
        },2000);

        $("#seasonImage").fadeOut(1000,function() {

            imageIndex++;

            if(imageIndex >= images.length) {
                imageIndex = 0;
            }

            $("#seasonImage").attr("src", images[imageIndex]);

            $("#seasonSquare").css("background", colors[imageIndex]);

            $("#seasonImage").fadeIn(1000);
        });
    }

    //Changes the image after a set interval
    setInterval(changeImage,6000);

    //Function that moves/animates the square by fetching its id and moving it left and right
    function moveSquare() {
        $("#seasonSquare").animate({
            left: "+=60"
        },2000).animate({
            left:"-=60"
        },2000);
    }

    setInterval(moveSquare,4000);

    //Function that increarses the index of the text variable, checks to see if the index is longer than the length of the array, if it is it resets it to 0
    //Gets text in the array by id then animates it sliding up and down by interval as well as moving the text left to right
    function changeText() {
        textIndex++;

        if(textIndex >= textArray.length) {
            textIndex = 0;
        }

        $("#seasonText").slideUp(500,function(){
            $(this).text(textArray[textIndex]).slideDown(500);
        });

        $("#seasonText").animate({
            left: "+=30"
        },1000).animate({
            left: "-=30"
        },1000);
    }

    setInterval(changeText,5000);

    //$("#textButton").click(function(){
        //$("#seasonText").text(textArray[textIndex]).fadeIn();
    //});
});