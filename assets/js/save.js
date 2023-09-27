let initialElement = document.querySelector("#initials");
let scoreElement = document.querySelector("#score");

//function to store highscores
function storeHighScore () {
    let initials = initialElement.value.trim();

    if (initials.length > 3) {
        alert("No more than 3 initials")
    }
    
    else if (initials.length === 0) {
        alert("Please enter up to 3 initials")
    }
    
    
    else {
        alert("Score saved!")
        let highScore = JSON.parse(localStorage.getItem("highscores")) || []
        let newScore = {
            total: score,
            name: initials
        }
    
        highScore.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highScore));
        alert("You scored " + newScore.total);
        window.localStorage.href = "index.html";
    }
};

//
let submitButton = $("#submit");
// console.log(submitButton);
submitButton.on("click", storeHighScore);


// function displayHighScores (){
//     let highScores = JSON.parse(localStorage.getItem("highscores"));
// console.log(highScores);
//     highScores.sort(function(a, b){
//         return b.score - a.score;
//     })
    
//     highScores.forEach(function(score){
//         let li = document.createElement("li");
//         li.textContent = `${score.name.toUpperCase()}  -  ${score.score}`;

//         let results = document.querySelector('#highscoreDisplay');
//         results.appendChild(li);
//     })
// };

function clearScores () {
    localStorage.removeItem("highscores");
    window.location.reload();

}

let clearButton = $('#clearButton');
clearButton.on("click", clearScores);

// displayHighScores ( );

let resetGame = $("#reset");
resetGame.on("click", resetState);


// let submitButton = document.querySelector("#submit");
// submitButton.addEventListener("submit", storeHighScore);


// let submitButton = document.querySelector("#submit");
// submitButton.on("click", function (event) {
//     event.preventDefault();
//     if (canBeClicked){
//         canBeClicked = true;
//     storeHighScore;
//     };
// });