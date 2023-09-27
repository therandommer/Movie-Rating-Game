function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";
  
    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
  }
  
  //function to display highscores in table
  function displayHighScores (){
    let highScores = JSON.parse(localStorage.getItem("highscores"));
console.log(highScores);
    highScores.sort(function(a, b){
        return b.score - a.score;
    })
    
    highScores.forEach(function(score){
        let li = document.createElement("li");
        console.log(score);
        const tdData = `<td>${score.name.toUpperCase()}</td><td>${score.total}</td>`

        let results = $('#highscoreDisplay');
        console.log(results);
        results.append(tdData);
    })
};
displayHighScores ();
