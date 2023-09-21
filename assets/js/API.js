console.log("HI!");

//API Integration
//---GIPHY---
let giphySearchNumber = "1"; //how many results to return from giphy
let giphySearchTerm = "The Matrix"; //what to search FOR TESTING
let giphyAPIKey = "2XZcXmpvYUadnnAv7e65tvDtSeK2VHSC";
let testGiphyAPIUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&q=${giphySearchTerm}&limit=${giphySearchNumber}&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`;
//---OMDB---
let omdbMovieSearch = "The Matrix";
let omdbAPIKey = "3646905f";
let testOmdbAPIUrl = `http://www.omdbapi.com/?apikey=${omdbAPIKey}&t=${omdbMovieSearch}`;

function populateFeedback(gif)
{
    let giphyAPIUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&q=${gif}&limit=${giphySearchNumber}&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`;
    fetch(giphyAPIUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function(content) //giphy response
    {
        console.log(content.data);
        //referencing new image to create
        let thisImage = $("<img id='temp'>");

        //setting image attributes
        thisImage.attr('src', content.data[0].images.fixed_height.url);
        thisImage.attr('alt', content.data[0].title);

        //placing the new image on the site
        $("#feedbackGif").append(thisImage); //
        
    })
    .catch(error =>
    {
        console.error("Error in giphyAPI");
        console.log(error);
    });
}

//film = search query, filmNumber = if it will populate filmOne(1) or filmTwo(2)
function populateFilms(film, filmNumber)
{
    let omdbAPIURL = `http://www.omdbapi.com/?apikey=${omdbAPIKey}&t=${film}`;
    console.log(omdbAPIURL);
    fetch(omdbAPIURL)
    .then(function (response) {
        return response.json();
    })
    .then(function(content) //omdb response
    {
        console.log(content);
        //referencing new image to create
        let thisImage = $("<img id='temp'>");

        //setting image attributes
        thisImage.attr('src', content.Poster);
        thisImage.attr('alt', content.Title);

        //placing the new image on the site
        if(filmNumber === 1) //place poster on the left
        {
            $("#filmOne").prepend(thisImage);
        }
        else if (filmNumber === 2) //place poster on the right
        {
            $("#filmTwo").prepend(thisImage);
        }
    })
    .catch(error =>
    {
        console.error("Error in omdbAPI");
    });
}


populateFeedback("Congratulations");
//populateFeedback("The Avengers");
populateFilms("The Matrix", 1);
populateFilms("The Avengers", 2);