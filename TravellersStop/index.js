var express = require("express");
var app = express();

app.set("view engine","ejs");

app.get("/",function(req,res){
  res.render("home");
});


app.get("/places",function(req,res){
  
  var places = [
      {name: "3145",image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
      {name: "3245",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
      {name: "3345",image:"https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg"}
      ];
  
  res.render("places",{ResPlaces: places});
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Travellers Stop has Started Successfully!!");
});