let initialElement = document.querySelector("#initials");
let scoreElement = document.querySelector("#score");


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
            score: timer,
            name: initials
        }
    
        highScore.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highScore));
    
        window.localStorage.href = "highscores.html";
    }
};

function displayHighScores (){
    let highScores = JSON.parse(localStorage.getItem("highscores"));

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