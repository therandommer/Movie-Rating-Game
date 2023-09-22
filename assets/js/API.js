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
let movie1TitleText = $("#filmOneName");
let movie2TitleText = $("#filmTwoName");

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
    const generateRandom = () =>{
        const numbers = new Set();
        while(numbers.size < 7 ){
            const randomNumber = Math.floor(Math.random() * 1000000);
            console.log(randomNumber);
            numbers.add(`0${randomNumber}`);
        }
        return [...numbers];
    }
    //console.log("random number",generateRandom())
   return new  Array(5).fill(0).map(()=>{
        let randomId = Math.floor(Math.random() * 1000000);
        console.log(randomId);
        if(randomId.toString().length > 6){
            randomId = Math.floor(Math.random() * 1000000);
        }
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
    });
}
async function getFilmList()
{
    let allFilms = generateRandomFilm();
    // let omdbAPIURL = `http://www.omdbapi.com/?apikey=${omdbAPIKey2}&i=${searchTerm}`;
    // console.log("OMDB API URL = " + omdbAPIURL);

    // const alFilms = [searchTerm];

    const requestFilms = allFilms.map(async (randomValue)=>{
        let omdbAPIURL = `http://www.omdbapi.com/?apikey=${omdbAPIKey2}&i=${randomValue}`;

        return await fetch(omdbAPIURL);
    });
    console.log(requestFilms)

    const allResponse = await Promise.all(requestFilms);

    const parseResponse = allResponse.map(async(response)=> await response.json());

    const data = await Promise.all(parseResponse);
    return data;
}
//film = search query, filmNumber = if it will populate filmOne(1) or filmTwo(2)
async function populateFilms(filmNumber) {
    let data = getFilmList();

    console.log("Data is: " + data);

    let validMovieFound = false;

    while (!validMovieFound)
    {
        const randomMovie = data.find(movie=>movie.imdbRating != "N/A" && movie.imdbVotes > 40 && movie.Poster != "N/A");
        console.log("Random movie array is:" + randomMovie);
        if(Array.isArray(randomMovie))
        {
            validMovieFound = true;
            console.log("A movie was found");
        }
        else
        {
            getFilmList();
        }
    }
    

 console.log(randomMovie);


    // fetch(omdbAPIURL)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (content) //omdb response
    //     {
    //         console.log(content);
    //         //Checks if the id is valid and the content has a rating and the content has a poster to display. Also (tries to) filter NSFW content.
    //         //And filters by films that have had more than 40 votes
    //         if(content.response = true && content.imdbRating != "N/A" && content.imdbVotes > 40 && content.Poster != "N/A" && content.Genre != "Adult" && content.Rated != "R" && content.Rated != "N/A")
    //         {
    //             //referencing new image to create
    //             let thisImage = $("<img id='temp'>");

    //             //setting image attributes
    //             thisImage.attr('src', content.Poster);
    //             thisImage.attr('alt', content.Title);
                

    //             //placing the new image on the site
    //             if (filmNumber === 1) //place poster on the left
    //             {
    //                 movie1TitleText.text(content.Title);
    //                 $("#filmOne").prepend(thisImage);
    //             }
    //             else if (filmNumber === 2) //place poster on the right
    //             {
    //                 movie2TitleText.text(content.Title);
    //                 $("#filmTwo").prepend(thisImage);
    //             }
    //         }
    //         else
    //         {
    //             populateFilms(filmNumber); //regenerate the id and try again.
    //             console.log("Regenerating film");
    //         }
    //     })
    //     .catch(error => {
    //         console.error("Error in omdbAPI");
    //     });
}

generateRandomFilm();
populateFeedback("Congratulations");
//populateFeedback("Try again next time");
populateFilms(1);
populateFilms(2);