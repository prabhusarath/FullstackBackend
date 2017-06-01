var apps = require('express')();
var reqq = require('request');

reqq('https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, response, body) {
  if(error){
      console.log('error:', error);
  }else{
  //console.log('statusCode:', response.statusCode); // Print the response status code if a response was received 
  //console.log('body:', body); // Print the HTML for the Google homepage.} 
  
  var parsedweather = JSON.parse(body);
  console.log('Wind Chill:',parsedweather['query']['results']['channel']['wind']['chill']);
  console.log('Wind direction:',parsedweather['query']['results']['channel']['wind']['direction']);
  console.log('Wind speed:',parsedweather['query']['results']['channel']['wind']['speed']);
}});
