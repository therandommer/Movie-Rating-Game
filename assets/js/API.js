console.log("HI!");

//API Integration
//---GIPHY---
let giphySearchNumber = "1"; //how many results to return from giphy
let giphySearchTerm = "The Matrix"; //what to search FOR TESTING
let giphyAPIKey = "2XZcXmpvYUadnnAv7e65tvDtSeK2VHSC";
let testGiphyAPIUrl = `https://api.giphy.com/v1/gifs/random?api_key=${giphyAPIKey}&q=${giphySearchTerm}&limit=${giphySearchNumber}&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`;
//---OMDB---
let omdbMovieSearch = "The Matrix";
let omdbAPIKey = "3646905f";
let omdbAPIKey2 = "81729a7c";
//let testOmdbAPIUrl = `http://www.omdbapi.com/?apikey=${omdbAPIKey}&t=${omdbMovieSearch}`;
//Object references for OMDB call
let film1TitleText = $("#filmOneName");
let film2TitleText = $("#filmTwoName");

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

//create 5 random strings
function generateRandomFilm() { 
    //console.log("random number",generateRandom())
   return new  Array(5).fill(0).map(()=>{
        let randomId = Math.floor(Math.random() * 1000000);
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
            case 7: //just in case the random is 1million+
                break;
            default:
                console.error("Incorrect random length");
                break;
        }
        console.log("tt" + randomId);
        return "tt" + randomId;
    });
}
async function getFilmList()
{
    //generates a list of random films at once
    let allFilms = generateRandomFilm();

    //creates a map out of the films generated above and fetches each film.
    const requestFilms = allFilms.map(async (randomValue)=>{
        let omdbAPIURL = `http://www.omdbapi.com/?apikey=${omdbAPIKey}&i=${randomValue}`;

        return await fetch(omdbAPIURL);
    });
    console.log(requestFilms)

    //wait till the above film fetches are returned
    const allResponse = await Promise.all(requestFilms);
    //translates each film into a json object
    const parseResponse = allResponse.map(async(response)=> await response.json());

    let data = await Promise.all(parseResponse);
    
    console.log(`Film list data is: ${data}`);
    return data;
}

//filmNumber determines if the film will be set to the left(1) or the right(2).
//data will contain the omdb API data fed in from the populateFilms function
function generateFilmContent(filmNumber, data)
{
    let filmText = "";
    let filmImage = "";
    
    //left side logic
    if(filmNumber === 1)
    {
        filmText = "film1TitleText";
        filmImage = "#filmOne"
        setRating1(data.imdbRating);
    }
    else //right side logic
    {
        filmText = "film2TitleText";
        filmImage = "#filmTwo"
        setRating2(data.imdbRating);
    }
    let thisImage = $("<img id='temp'>");

    //setting image attributes
    thisImage.attr('src', data.Poster);
    thisImage.attr('alt', data.Title);
    
    $(filmImage).prepend(thisImage);
    filmText.text(data.Title);
}

//film = search query, filmNumber = if it will populate filmOne(1) or filmTwo(2)
async function populateFilms(filmNumber) {
    
    //generates the data to be used for the below functions. All returned as json objects
    let data = getFilmList();

    console.log("Data is: " + data);

    let validMovieFound = false; //bool to check if we find a valid film

    while (!validMovieFound)
    {
        //!data.find does not work, why?
        // const randomMovie = data.find(movie=>movie.imdbRating != "N/A" && movie.imdbVotes > 40 && movie.Poster != "N/A");
        // let chosenMovie = "";
        // console.log("Found in while loop: " + randomMovie);
        // if(Array.isArray(randomMovie)) //does the array contain a film with the specified criteria?
        // {
        //     validMovieFound = true; //allows the code to move on
        //     chosenMovie = randomMovie; //!Preferably set to the film that procs the isArray logic
        //     console.log("A movie was found");
        // }
        // else //try again
        // {
        //     console.log("Trying again");
        //     getFilmList();
        // }
    }
    

    console.log(randomMovie);
    generateFilmContent(filmNumber, chosenMovie);
}