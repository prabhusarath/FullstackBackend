var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/travellers_stop");
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));

var schemas =new mongoose.Schema({
  name:String,
  image:String
});

var TravelStop = mongoose.model("TravelStop",schemas);


app.get("/",function(req,res){
  res.render("home");
});


app.get("/places",function(req,res){
     TravelStop.find({},function(err,ans){
        if(err){
            console.log(err);
        } else {
            res.render("places",{ResPlaces: ans});
        }
    });
  
});


app.post("/places",function(req,res){
    var namevalues = req.body.dest;
    var imgvalues = req.body.imgsrc;
    var newobj = {name: namevalues,image:imgvalues}
    
    TravelStop.create(newobj,function(err,ans){
        if(err){
            console.log(err);
        } else {
            //res.render("places",{ResPlaces: ans});
            console.log("Campground Added Successfully");
            res.redirect("/places");
        }
    });
    
    });

app.get("/places/new",function(req,res){
  res.render("newplaces");
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Travellers Stop has Started Successfully!!");
});