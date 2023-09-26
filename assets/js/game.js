//variable declaration
let rating1 = 5; //!set to this value just to test game logic
let rating2 = 0;
let feedbackTimer = 5000; //time in ms that the feedback will be displayed on the screen for.

//player variables
let defaultLives = 5;
let lives = 0;
let defaultScore = 0;
let score = 0;
let guessValue = 100; //used to incrememnt the score value for each correct guess.

//---Object references---
const filmOneButton = $("#filmOneBtn");
const filmTwoButton = $("#filmTwoBtn");
const lifeText = $("#lives");
const scoreText = $("#score");
const feedbackText = $("#feedbackText");
const feedbackGif = $("#feedbackGif");

//---Functions and logic---

function setRating1(rating)
{

    rating1 = rating;
    
}
function setRating2(rating)
{
    rating2 = rating;
}
//if willHide is true, will hide the feedbackElements instead of reveal it. isCorrect determines if the gif to reveal is happy or sad, and determines what the feedback text will say
function revealFeedback(willHide, isCorrect)
{
    //!enable the gif, do a search for happy or sad, hide after X seconds
    //!enable the text, fill it with correct/incorrect, hide after X seconds
    if(!willHide)
    {
        let gifToHide = $("#tempGif");
        gifToHide.remove();
        //setting variables, etc. before revealing objects
        if(isCorrect)
        {
            feedbackText.text(`You guessed correctly!\n ${rating1} VS ${rating2}`);
            populateFeedback("Congratulations");
        }
        else
        {
            feedbackText.text(`You guessed incorrectly!\n ${rating1} VS ${rating2}`);
            populateFeedback("Oof");
        }
        feedbackText.removeClass("hide");
        feedbackGif.removeClass("hide");
        console.log("Hiding the feedback in " + feedbackTimer + " MS");
        setTimeout(
            function(){ revealFeedback(true, isCorrect) },
            feedbackTimer
          ); //will hide the elements after a set time
    }
    else
    {
        feedbackText.addClass("hide");
        feedbackGif.addClass("hide");
        console.log("Hiding feedback elements");
    }
    
}
//remove the movie element, called before each new movie generation call.
function removeMovies()
{
    let filmToRemove = $(".temp"); //should remove any element with the id of temp
    filmToRemove.remove();
}
//if willHide is true, will hide the main game elements instead of reveal it.
function revealMovies(willHide)
{
    let movies = $(".temp");
    if(!willHide)
    {
        movies.removeClass("hide");
    }
    else
    {
        movies.addClass("hide");
    }
    //!reveal the movies after generation.
    //!hide the movies on game over
}

//resets any elements and variables on the screen to their default values
function resetState()
{
    lives = defaultLives;
    score = defaultScore;
    lifeText.text(lives);
    scoreText.text(score);
    //revealFeedback(false, true);
    revealMovies(false);
}

//reusable start generation function. Can be called every time the films need to be regenerated (ie after button click, etc.)
function startGeneration()
{
    //!commented out the following so I can test other things
    generateRandomFilm();
    
    //populateFeedback("The Avengers");
    //populateFilms(1);
    //populateFilms(2); 
}
//will handle logic for correct and incorrect guesses.
function filmGuessed(isCorrect)
{
    if(isCorrect)
    {
        console.log("player guessed correct");
        score += guessValue;
        scoreText.text(score);
        console.log("New score: " + score);
        revealFeedback(false, true);
    }
    else
    {
        console.log("player guessed incorrect");
        lives--;
        if(lives>0)
        {
            lifeText.text(lives);
            console.log("New lives: " + lives);
            revealFeedback(false, false);
        }
        
        else if(lives <= 0)
        {
            console.log("game over");
        }
    }
}
function movieClicked(filmNumber)
{
    console.log("movie clicked: " + filmNumber);
    console.log(`Rating 1 is ${rating1} rating 2 is ${rating2}`);
    let winningFilm = 0;
    if(rating1>rating2)
    {
        winningFilm = 1;
        console.log("Rating 1 is higher!");
    }
    else if(rating1<rating2)
    {
        winningFilm = 2;
        console.log("Rating 2 is higher!");
    }
    else
    {
        winningFilm = 0;
        console.log("Both ratings are the same!");
    }
    if(filmNumber === winningFilm || winningFilm === 0)
    {
        filmGuessed(true);
    }
    else
    {
        filmGuessed(false);
    }
}

//button listeners
filmOneButton.on("click", function(event)
{
    event.preventDefault();
    movieClicked(1);
});
filmTwoButton.on("click", function(event)
{
    event.preventDefault();
    movieClicked(2);
});


//on initialisation logic
startGeneration();
resetState();
revealMovies(false); //reveals the movie elements
revealFeedback(true); //hides any feedback elements