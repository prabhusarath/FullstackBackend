var apps = require('express')();
var reqq = require('request');

apps.set("view engine","ejs");

apps.get("/",function(req,res){
  res.render("sarath");
});

apps.get("/results",function(req,res){
  var movie_search = req.query.movie;   
  
  var url = "http://www.omdbapi.com/?s="+ movie_search + "&apikey=thewdb";
  
  reqq(url, function (error, response, body) {
  var data = JSON.parse(body);
  res.render("search",{ResMovies: data});
})
});


apps.listen(process.env.PORT,process.env.IP,function(){
   console.log("Movie Search has Started Successfully!!") 
});