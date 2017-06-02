var apps = require('express')();
var reqq = require('request');

apps.get("/results",function(req,res){
   reqq('http://www.omdbapi.com/?s=Star&apikey=thewdb', function (error, response, body) {
  if(error){
      console.log('error:', error);
  }else{
  var parsedmovie = JSON.parse(body);
  res.send(parsedmovie['Search'][0])
}});
});


apps.listen(process.env.PORT,process.env.IP,function(){
   console.log("Movie Search has Started Successfully!!") 
});