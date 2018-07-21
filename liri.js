//Variables
const result = require('dotenv').config();
const keys = require('./keys.js');
const fs = require('fs');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let command = process.argv[2];
let input = process.argv[3];

//get args

//switch
main(command,input);
//do stuff

function myTweets() {
    let params =
    {
        screen_name: 'xryswelter'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}
function spotifySearch() {
    spotify.search({ type: 'track', query: `${input}` }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}

function movie() {
    if (input === "undefined") { input = 'Mr Nobody' }
    var queryUrl = `http://www.omdbapi.com/?t="${input}"&y=&plot=short&apikey=trilogy`;

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            movie = JSON.parse(body)
            // console.log(movie);
            let movieArr = [
                'Name: '+ movie.Title,
                'Year: '+ movie.Year,
                'IMBD Rating: ' + movie.ImdbRating,
                'Rotten Tomato Rating: ' + movie.Ratings[2].Value,
                'Creation Location: ' + movie.Country,
                'Language: ' + movie.Language,
                'Plot: ' + movie.Plot,
                'Actors: ' + movie.Actors
            ].join('\n\n')
            console.log(movieArr);
        }
    });
}

function whatItSays(){
    console.log("foo");
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) throw err;
        
        let output = data.split(",");
        console.log(output);
        main(output[0],output[1])
    });
    
}
//switch function to call from the node request function command
function main(command, input){
    switch (command) {
        case 'my-tweets':
            myTweets();
            break;
        case 'spotify-this-song':
            spotifySearch();
            break;
        case 'movie-this':
            movie();
            break;
        case 'do-what-it-says':
            whatItSays();
            break;
        default:
        console.log("invalid command");
        
            break;
    }
}

