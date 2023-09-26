//variable declaration
let rating1 = 5; //!set to this value just to test game logic
let rating2 = 0;

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
const feedbackGif = $("feedbackGif");

//---Functions and logic---

function setRating1(rating)
{
    rating1 = rating;
}
function setRating2(rating)
{
    rating2 = rating;
}
//if willHide is true, will hide the feedbackElements instead of reveal it.
function revealFeedback(willHide)
{
    //!enable the gif, do a search for happy or sad, hide after X seconds
    //!enable the text, fill it with correct/incorrect, hide after X seconds

}

//if willHide is true, will hide the main game elements instead of reveal it.
function revealMovies(willHide)
{
    //!reveal the movies after generation.
    //!hide the movies on game over
}

//resets any variables on the screen to their correct values
function resetVariables()
{
    lives = defaultLives;
    score = defaultScore;
    lifeText.text = lives;
    console.log("Life text value is: " + lifeText.text);
    scoreText.text = score;
    console.log("Score text value is: " + scoreText.text);
}

//reusable start generation function. Can be called every time the films need to be regenerated (ie after button click, etc.)
function startGeneration()
{
    //!commented out the following so I can test other things
    //generateRandomFilm();
    //populateFeedback("Congratulations");
    //populateFeedback("Try again next time");
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
        scoreText.text = score;
        console.log("New score: " + scoreText.text);
    }
    else
    {
        console.log("player guessed incorrect");
        lives--;
        lifeText.text = lives;
        console.log("New lives: " + lifeText.text);
        if(lives === 0)
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
resetVariables();
revealMovies(false); //reveals the movie elements
revealFeedback(true); //hides any feedback elements