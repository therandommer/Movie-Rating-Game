console.log("HI!");

//API Integration
//---GIPHY---
let giphySearchNumber = "1"; //how many results to return from giphy
let giphySearchTerm = "The Matrix"; //what to search FOR TESTING
let giphyAPIKey = "2XZcXmpvYUadnnAv7e65tvDtSeK2VHSC";
let testGiphyAPIUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&q=${giphySearchTerm}&limit=${giphySearchNumber}&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`;
//---OMDB---
let omdbMovieSearch = "The Matrix";
let omdbAPIKey = "81729a7c";
let testOmdbAPIUrl = `http://www.omdbapi.com/?apikey=${omdbAPIKey}&t=${omdbMovieSearch}`;

function populateFeedback(gif) {
    let giphyAPIUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&q=${gif}&limit=${giphySearchNumber}&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`;
    fetch(giphyAPIUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (content) //giphy response
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
        .catch(error => {
            console.error("Error in giphyAPI");
            console.log(error);
        });
}

function generateRandomFilm() {
    let randomId = Math.floor(Math.random() * 1000000) + 1;
    if (randomId.toString().length)
    //prepending 0's to the id to ensure the id fits imdb/omdb formatting styles.
        switch (randomId.toString().length) {
            case 1:
                randomId = "000000" + randomId;
                break;
            case 2:
                randomId = "00000" + randomId;
                break;
            case 3:
                randomId = "0000" + randomId;
                break;
            case 4:
                randomId = "000" + randomId;
                break;
            case 5:
                randomId = "00" + randomId;
                break;
            case 6:
                randomId = "0" + randomId;
                break;
            default:
                console.error("Incorrect random length");
                break;
        }
    console.log("tt" + randomId);
    return "tt" + randomId;
}
//film = search query, filmNumber = if it will populate filmOne(1) or filmTwo(2)
function populateFilms(filmNumber) {
    let searchTerm = generateRandomFilm();
    let omdbAPIURL = `http://www.omdbapi.com/?apikey=${omdbAPIKey}&i=${searchTerm}`;
    console.log("OMDB API URL = " + omdbAPIURL);
    fetch(omdbAPIURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (content) //omdb response
        {
            console.log(content);
            //check if the id is valid and the content has a rating and the content has a poster to display. Also (tries to) filter NSFW content
            if(content.response = true && content.imdbRating != "N/A" && content.Poster != "N/A" && content.Genre != "Adult" && content.Rated != "R")
            {
                //referencing new image to create
                let thisImage = $("<img id='temp'>");

                //setting image attributes
                thisImage.attr('src', content.Poster);
                thisImage.attr('alt', content.Title);

                //placing the new image on the site
                if (filmNumber === 1) //place poster on the left
                {
                    $("#filmOne").prepend(thisImage);
                }
                else if (filmNumber === 2) //place poster on the right
                {
                    $("#filmTwo").prepend(thisImage);
                }
            }
            else
            {
                populateFilms(filmNumber); //regenerate the id and try again.
                console.log("Regenerating film");
            }
        })
        .catch(error => {
            console.error("Error in omdbAPI");
        });
}

generateRandomFilm();
populateFeedback("Congratulations");
//populateFeedback("The Avengers");
populateFilms(1);
populateFilms(2);