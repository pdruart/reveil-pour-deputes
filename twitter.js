var Twitter = require('twitter');

// Create Twitter Client to call api 
var client = new Twitter({
    consumer_key: 'TeTMNKGWPenxDfNrj6d9sQElS',
    consumer_secret: 'BR2me33diUw4ZSb3WQd2ZudWunkeWbT3yo4UCYI98v9fITUw6O',
    access_token_key: '377360336-nqX9cEDRMEIx3J81F90W5ydoGahip1ONj8JPXCui',
    access_token_secret: '0YmFKswx0FLyMYMEn8Hzd7jpiwNjghSFhVwwIAIcMUznc'
});

// Define JSON File
var fs = require("fs");
// Get content from file
var contents = fs.readFileSync("depute.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);

var collection = jsonContent.collection1
var property = jsonContent.property1
console.log(collection)
console.log(property)

/*
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
	console.log(tweets);
    }
});
*/
