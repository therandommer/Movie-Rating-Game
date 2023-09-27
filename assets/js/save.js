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

function displayHighScores (){
    let highScores = JSON.parse(localStorage.getItem("highscores"));

    if(highScores != null)
    {
        highScores.sort(function(a, b){
            return b.score - a.score;
        })
        
        highScores.forEach(function(score){
            let li = document.createElement("li");
            li.textContent = `${score.name.toUpperCase()}  -  ${score.score}`;
    
            let results = document.querySelector('#highscoreDisplay');
            results.appendChild(li);
        })
    }
    
};
//on click for submit score
let submitButton = $("#submit");
submitButton.on("click", storeHighScore);

//function to clear scores on clear button
function clearScores () {
    localStorage.removeItem("highscores");
    window.location.reload();

}

let clearButton = $('#clearButton');
clearButton.on("click", clearScores);

//reset button functionality to restart game on completion
let resetGame = $("#reset");
resetGame.on("click", resetState);
