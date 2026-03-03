//Creates a new array to store the objects in.
var slides = [];

//Creates a class that defines objects.
class myViewFinder {

    //creates the constructor function that sets the slides data when they are created.
    constructor(title, image, description, author, year) {
        this._title = title;
        this._image = image;
        this._description = description;
        this._author = author;
        this._year = year;
    }

    //Getters allow reading properties.
    get title() {
        return this._title;
    }
    get image() {
        return this._image;
    }
    get description() {
        return this._description;
    }
    get author() {
        return this._author;
    }
    get year() {
        return this._year;
    }

    //Setters allow modifying properties.
    set title(value) {
        this._title = value;
    }
    set image(value) {
        this._image = value;
    }
    set description(value) {
        this._description = value;
    }
    set author(value) {
        this._author = value;
    }
    set year(value) {
        this._year = value;
    }
}

// Function that creates each object slide with it's own respective data.
function initializeArray() {

    var slide1 = new myViewFinder(
        "Black Lives Matter Movement (BLM)",
        "HW8/images/BLM_Movement.jpg",
        "The BLM movement aims to highlight racisim, discrimination and racial inequality experienced by black people in the United States. The movement especially focused on anti-racisim and police brutality.",
        "Creator Unknown",
        "2013-2021"
    );

    var slide2 = new myViewFinder(
        "Women's Suffrage Movement",
        "HW8/images/Suffrage.jpg",
        "Women's suffrage is the right of women to vote in elections. Women rarely had rights to vote, even in democratic systems. This movement pushed for women to have the right to vote in all democratic governing countries.",
        "Creator Unknown",
        "1893-1920"
    );

    var slide3 = new myViewFinder(
        "Roe V. Wade",
        "HW8/images/Roe.jpg",
        "Roe V. Wade was an incredibly important Supreme Court desicion that ruled in favor of protecting women's rights. This ruling gave women the right to chose to have an abortion before the point of fetal viability.",
        "Lorie Shaull",
        "1973"
    );

    var slide4 = new myViewFinder(
        "Feminist Movement",
        "HW8/images/Feminist.jpg",
        "The feminist movement is a series of social, and politcal campaigns that pushed for radical and liberal reforms on women's issues. These issues focused heavily on the inequality between men and women.",
        "J. Howard Miller",
        "1848-Current"
    );

    var slide5 = new myViewFinder(
        "MeToo Movement",
        "HW8/images/MeToo.jpg",
        "The MeToo movement is a social awareness campaign against sexual abuse and harrassment. This movement is lead by survivors who share their experiences to raise awarness and build support.",
        "Alec Perkins",
        "2006-Current"
    );

    //Addes all the slides to the empty array.
    slides.push(slide1, slide2, slide3, slide4, slide5);

    //Calls function to display one of the object slides.
    accessInformation();
}

function accessInformation() {

    //Generates a random number between 0 and the length of the array.
    var randomNumber = Math.floor(Math.random() * slides.length);

    //Picks a random slide from the array.
    var selectedSlide = slides[randomNumber];

    //Updates the DOM for each element.
    document.getElementById("title").innerHTML = selectedSlide.title;
    document.getElementById("image").src = selectedSlide.image;
    document.getElementById("description").innerHTML = selectedSlide.description;
    document.getElementById("author").innerHTML = selectedSlide.author;
    document.getElementById("year").innerHTML = selectedSlide.year;
}