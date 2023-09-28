//variable declaration
let rating1 = 5; //!set to this value just to test game logic
let rating2 = 0;
let feedbackTimer = 5000; //time in ms that the feedback will be displayed on the screen for.
let movieHideTimer = 3000; //time in ms before the existing films will be hidden.
let movieRevealTimer = 2000; //time in ms before the existing films will be revealed to the player.

//player variables
let defaultLives = 1;
let lives = 0;
let defaultScore = 0;
let score = 0;
let guessValue = 100; //used to incrememnt the score value for each correct guess.
let canBeClicked = false; //used to limit when the player can click a button.
let gameOver = false; //used to determine if the player is out of lives or not
const isAPIKeyWorking = true; //!Set this to false if no movies generate

//---Object references---
const filmOneButton = $("#filmOneBtn");
const filmTwoButton = $("#filmTwoBtn");
const lifeText = $("#lives");
const scoreText = $("#score");
const finalScoreText = $("#final-score");
const feedbackText = $("#feedbackText");
const canClickText = $("#canClickParagraph");
const feedbackGif = $("#feedbackGif");
const endScreen = $("#end-screen"); //used for game over state

//---Functions and logic---

function setRating1(rating) {

    rating1 = rating;

}
function setRating2(rating) {
    rating2 = rating;
}

//reusable start generation function. Can be called every time the films need to be regenerated (ie after button click, etc.)
function startGeneration() {
    if(isAPIKeyWorking) //generate the movies
    {
        populateFilms(1);
        populateFilms(2);
    }
    //!Only when the API keys don't work
    else //generates random api string and populates the elements left (1) and right (2) with movies
    {
        rating1 = Math.floor(Math.random() * 10);
        rating2 = Math.floor(Math.random() * 10);
    }
}

//if willHide is true, will hide the feedbackElements instead of reveal it. isCorrect determines if the gif to reveal is happy or sad, and determines what the feedback text will say
function revealFeedback(willHide, isCorrect) {
    if (!willHide) {  //display the relevant gif
        let gifToHide = $("#tempGif");
        gifToHide.remove(); //cleans previous gifs from page
        //while game is running
        if (!gameOver) {
            //setting variables, etc. before revealing objects
            if (isCorrect) { //correct choice
                feedbackText.text(`You guessed correctly!\n ${rating1} VS ${rating2}`);
                populateFeedback("Congratulations");
            }
            else { //incorrect choice
                feedbackText.text(`You guessed incorrectly!\n ${rating1} VS ${rating2}`);
                populateFeedback("Oof");
            }
            //revealing feedback here
            feedbackText.removeClass("hide");
            feedbackGif.removeClass("hide");
            //console.log("Hiding the feedback in " + feedbackTimer + " MS");
            //calls this function again after a delay to hide the elements displayed above
            setTimeout(
                function () { revealFeedback(true, isCorrect) },
                feedbackTimer
            );
        }
        else { //show the feedback elements with game over criteria
            feedbackText.removeClass("hide");
            feedbackGif.removeClass("hide");
            feedbackText.text("Game over");
            populateFeedback("Game Over");
        }

    }
    else { //hide the elements
        feedbackText.addClass("hide");
        feedbackGif.addClass("hide");
    }
}

//remove the movie element, called before each new movie generation call.
function removeMovies() {
    let filmToRemove = $(".temp"); //should remove any element with the id of temp
    filmToRemove.remove();
}

//if willHide is true, will hide the main game elements instead of reveal it.
//will also remove existing movies, generate new movies and unlock player input
function revealMovies(willReveal) {
    let movies = $(".tempFilm");
    if (willReveal) {
        movies.removeClass("hide");
        canBeClicked = true;
        canClickText.text("Can click: TRUE");// feedback for when the player can click
    }
    else { //hide the movies
        movies.addClass("hide");
        if (!gameOver) {
            movies.remove(); //deletes existing movies.
            filmOneButton.text("");
            filmTwoButton.text("");
            startGeneration(); //regenerates the movies on both sides
            setTimeout(
                function () { revealMovies(true) },
                movieRevealTimer
            ); //will reveal the movies after a set time so they can regenerate
        }

    }
}

//resets any elements and variables on the screen to their default values
function resetState() {
    gameOver = false;
    lives = defaultLives;
    score = defaultScore;
    lifeText.text(lives);
    scoreText.text(score);
    feedbackText.text("");
    filmOneButton.removeClass("hide");
    filmTwoButton.removeClass("hide");
    endScreen.addClass("hide");
    revealFeedback(false, true); //!Known bug, will generate a happy gif on game initilisation. Can be fixed by adjusting start of game logic.
    revealMovies(false); //will also generate a new movie.
}

//hides game UI, reveals game over UI. Sets states to default values where needed to indicate game over.
function onGameOver() {
    gameOver = true;
    finalScoreText.text(score);
    lifeText.text("0");
    revealMovies(false); //will also generate a new movie
    revealFeedback(false, false);
    filmOneButton.addClass("hide");
    filmTwoButton.addClass("hide");
    endScreen.removeClass("hide");
}

//will handle logic for correct and incorrect guesses.
function filmGuessed(isCorrect) {
    if (isCorrect) {
        console.log("player guessed correct");
        score += guessValue;
        scoreText.text(score);
        //console.log("New score: " + score);
        revealFeedback(false, true);
        setTimeout(
            function () { revealMovies(false) },
            movieHideTimer
        ); //will hide the movies after a set time so they can regenerate
    }
    else {
        console.log("player guessed incorrect");
        lives--;
        if (lives > 0) {
            lifeText.text(lives);
            //console.log("New lives: " + lives);
            revealFeedback(false, false);
            setTimeout(
                function () { revealMovies(false) },
                movieHideTimer
            ); //will hide the movies after a set time so they can regenerate
        }

        else if (lives <= 0) {
            onGameOver();
            console.log("game over");
        }
    }
}

//logic comparing the ratings of each film based on which movie was clicked.
function movieClicked(filmNumber) {
    //console.log("movie clicked: " + filmNumber);
    console.log(`Rating 1 is ${rating1} rating 2 is ${rating2}`);
    let winningFilm = 0;
    if (rating1 > rating2) {
        winningFilm = 1;
        console.log("Rating 1 is higher!");
    }
    else if (rating1 < rating2) {
        winningFilm = 2;
        console.log("Rating 2 is higher!");
    }
    else {
        winningFilm = 0;
        console.log("Both ratings are the same!");
    }
    if (filmNumber === winningFilm || winningFilm === 0) {
        filmGuessed(true);
    }
    else {
        filmGuessed(false);
    }
}

//button listeners, will only continue logic when canBeClicked == true
filmOneButton.on("click", function (event) {
    event.preventDefault();
    if (canBeClicked) {
        canBeClicked = false;
        canClickText.text("Can click: FALSE");
        movieClicked(1);
    }

});
filmTwoButton.on("click", function (event) {
    event.preventDefault();
    if (canBeClicked) {
        canBeClicked = false;
        canClickText.text("Can click: FALSE");
        movieClicked(2);
    }
});

//---On Initialisation---
resetState(); 