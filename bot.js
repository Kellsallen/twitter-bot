console.log('replying tweet is starting......')

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

//  var params = {
//       q: 'ifikieWazazi', 
//       count: 10

//     }

//  T.get('search/tweets', params , gotData);


//  function gotData(err, data, response) {

//     var tweets = data.statuses;

//     for(i = 0; i<= tweets.length; i++){

//        console.log(tweets[i].text);
//     }
//   }



var stream = T.stream('user');

stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg){
    
  var fs =  require('fs');
  var json = JSON.stringify(eventMsg, null, 2);
  fs.writeFile('tweet.json', json);

}


tweetIt();

setInterval(tweetIt, 1000);

function tweetIt(txt) {


    var tweet = {

        status: txt
    }

    T.post('statuses/update', tweet, tweeted);


    function tweeted(err, data, response) {

        if (err) {

            console.log("Something went wrong");
        }
        else {

            console.log("It worked");

        }

        console.log(data)

    };




}
