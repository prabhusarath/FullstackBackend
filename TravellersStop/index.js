var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var TravelStop = require("./models/travel");
var comments = require("./models/comments");
var popdata = require("./dbdata");

mongoose.connect("mongodb://localhost/travellers_stop");
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));

popdata();

app.get("/places",function(req,res){
     TravelStop.find({},function(err,ans){
        if(err){
            console.log(err);
        } else {
            res.render("places/places",{ResPlaces: ans});
        }
    });
  
});


app.post("/places",function(req,res){
    var namevalues = req.body.dest;
    var imgvalues = req.body.imgsrc;
    var dee = req.body.descp;
    var newobj = {name: namevalues,image:imgvalues,descp:dee}
    
    TravelStop.create(newobj,function(err,ans){
        if(err){
            console.log(err);
        } else {
            //res.render("places",{ResPlaces: ans});
            console.log("Campground Added Successfully");
            res.redirect("places/places");
        }
    });
    
    });

app.get("/places/new",function(req,res){
  res.render("places/newplaces");
});

app.get("/places/:id",function(req,res){
    TravelStop.findById(req.params.id).populate("views").exec(function(err,found){
        if(err){
            console.log(err);
        } else {
            res.render("places/shows",{ccc: found});
        }
    });
});

app.get("/places/:id/comments/new",function(req,res){
    TravelStop.findById(req.params.id,function(err,ans){
        if(err){
            console.log(err);
        } else {
            res.render("comments/newcomments",{views:ans});
        }
    });
});

app.post("/places/:id/comments",function(req,res){
    TravelStop.findById(req.params.id,function(err,ans){
        if(err){
            res.redirect("/places");
        } else 
        {
                        console.log(req.body.view);
                        comments.create(req.body.view,function(err,viewans){
                        if(err){
                            console.log(err);
                        } else {
                            ans.views.push(viewans);
                            ans.save();
                            res.redirect("/places/"+ans._id);
                        }
                        });
        }
    });
    
    
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Travellers Stop has Started Successfully!!");
});