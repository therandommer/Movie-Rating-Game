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
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
console.log("HI!");

//API Integration
//---GIPHY---
let giphySearchNumber = "1"; //how many results to return from giphy
let giphySearchTerm = "Matrix"; //what to search
let giphyAPIKey = "2XZcXmpvYUadnnAv7e65tvDtSeK2VHSC";
let giphyAPIUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&q=${giphySearchTerm}&limit=${giphySearchNumber}&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`;
//---OMDB---
let omdbMovieSearch = "Matrix";
let omdbAPIKey = "3646905f";
let omdbAPIUrl = `http://www.omdbapi.com/?apikey=${omdbAPIKey}&s=${omdbMovieSearch}`;

fetch(giphyAPIUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function(contnet) //giphy response
    {
        var imageUrl = content.data.images.original.url;
        
    })
    .catch(error =>
    {
        console.error("Error in giphyAPI");
    });

console.log(omdbAPIUrl);
fetch(omdbAPIUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(content) //omdb response
    {
        
    })
    .catch(error =>
    {
        console.error("Error in omdbAPI");
    });;
