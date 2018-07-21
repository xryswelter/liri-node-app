//Variables
const result = require('dotenv').config();
const keys = require('./keys.js');
const fs = require('fs');
const Twitter = require('twitter');
// const Spotify = require('spotify');
const request = require('request');

// let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let command = process.argv[2];
let input = process.argv[3];

function myTweets(){
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
function spotify(){
    
}
//switch function to call from the node request function command
switch (command) {
    case 'my-tweets':
    myTweets();
        break;
    case 'spotify-this-song':
        stopify();
        break;
    case 'movie-this':

        break;
    case 'do-what-it-says':

        break;
    default:
        break;
}

