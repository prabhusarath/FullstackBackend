var express = require("express");
var router = express.Router();

var TravelStop = require("../models/travel");
var comments = require("../models/comments"); 

router.get("/",function(req,res){
    //console.log(req.user);
     TravelStop.find({},function(err,ans){
        if(err){
            console.log(err);
        } else {
            res.render("places/places",{ResPlaces: ans});
        }
    });
  
});


router.post("/",function(req,res){
    
    var namevalues = req.body.dest;
    var imgvalues = req.body.imgsrc;
    var dee = req.body.descp;
    var newobj = {
        name: namevalues,
        image:imgvalues,
        descp:dee
    }
    
    TravelStop.create(newobj,function(err,ans){
        if(err){
            console.log(err);
        } else {
            console.log("Campground Added Successfully");
            res.redirect("/places");
        }
    });
    
    });

router.get("/new",function(req,res){
  res.render("places/newplaces");
});

router.get("/:id",function(req,res){
    TravelStop.findById(req.params.id).populate("views").exec(function(err,found){
        if(err){
            console.log(err);
        } else {
            res.render("places/shows",{ccc: found});
        }
    });
});

module.exports = router;

