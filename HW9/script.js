$(document).ready(function() {

    let images = [
        "./HW9/images/spring.webp",
        "./HW9/images/fall.avif",
        "./HW9/images/winter.webp"
    ];

    let textArray = [
        "Spring cycles renewal.",
        "Fall brings the coming of change.",
        "Winter makes us remember what once was.",
        "Nature gives us insight into our own lives.",
        "Each season shows us balance."
    ];

    let colors = [
        "#b8d8be",
        "#e69138",
        "#6fa8dc",

    ];

    let imageIndex = 0;
    let textIndex = 0;

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

    setInterval(changeImage,6000);

    function moveSquare() {
        $("#seasonSquare").animate({
            left: "+=60"
        },2000).animate({
            left:"-=60"
        },2000);
    }

    setInterval(moveSquare,4000);

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