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

function giphyResponse(giphySearch)
{
    console.log("giphy response" + JSON.stringify(giphySearch));
}
function omdbResponse(omdbSearch)
{
    console.log("omdb response" + JSON.stringify(omdbSearch));
}

fetch(giphyAPIUrl)
    .then(function (response) {
      return response.json();
    })
    .then(giphyResponse);

console.log(omdbAPIUrl);
fetch(omdbAPIUrl)
    .then(function (response) {
        return response.json();
    })
    .then(omdbResponse);