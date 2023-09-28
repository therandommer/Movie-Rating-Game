let initialElement = document.querySelector("#initials");
let scoreElement = document.querySelector("#score");

//function to store highscores
function storeHighScore () {
    let initials = initialElement.value.trim();
    let formFeedbackText = $("#formFeedback");
    if (initials.length > 3) {
        formFeedbackText.text("No more than 3 initials");
    }
    
    else if (initials.length === 0) {
        formFeedbackText.text("Please enter up to 3 initials");
    }
    
    
    else {
        formFeedbackText.text("Score saved!");
        let highScore = JSON.parse(localStorage.getItem("highscores")) || []
        let newScore = {
            total: score,
            name: initials
        };
    
        highScore.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highScore));
        //alert("You scored " + newScore.total);
        window.localStorage.href = "index.html";
    }
};

//pulls data from highscores and dispalys it onto the table elements
function displayHighScores (){
    let highScores = JSON.parse(localStorage.getItem("highscores"));
    console.log(highScores);
    //only run the following function if there are highscores to display in the correct table
    if(highScores != null && document.URL.includes("index.html"))
    {
        highScores.sort(function(a, b){
            return b.total - a.total;
        })
        
        highScores.forEach(function(score){
            //adjusted to use jquery and table elements instead of a list
            
            console.log(score);
            let scoreTable = $("#highscoreDisplay");
            let newRow = $("<tr>");
            let newName = $("<td class ='nameElement'>");
            let newScore = $("<td class='scoreElement'>");
            
            newName.html(`${score.name.toUpperCase()}`);
            newScore.html(`${JSON.stringify(score.total)}`);

            newRow.append(newName);
            newRow.append(newScore);
            scoreTable.append(newRow);

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

//only checks for the reset button on the game page
if (document.URL.includes("game.html") ) {
    let resetGame = $("#reset");
    console.log("Reset button found" + resetGame);
    resetGame.on("click", resetState);
}

