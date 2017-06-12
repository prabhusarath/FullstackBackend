var express = require("express");
var router = express.Router({mergeParams: true});

var TravelStop = require("../models/travel");
var comments = require("../models/comments");

var authorize = require("../authorize");

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


router.post("/",authorize.isLoggedIn,function(req,res){
    
    var namevalues = req.body.dest;
    var prices = req.body.price;
    var imgvalues = req.body.imgsrc;
    var dee = req.body.descp;
    var written = {
        id : req.user.id,
        username : req.user.username
    };
    
    //console.log(req.user);
    var newobj = {
        name: namevalues,
        price: prices,
        image:imgvalues,
        descp: dee,
        writtenby: written
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

router.get("/new",authorize.isLoggedIn,function(req,res){
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


router.get("/:id/edit",authorize.checkplacesownership,function(req, res) {
    
    TravelStop.findById(req.params.id,function(err,editcamp){
        if(err){
            res.redirect("/places"); // Error Status Check
        }
        else{
        res.render("places/edit",{campground:editcamp});
        }
    }); 
});

router.put("/:id",authorize.checkplacesownership,function(req, res) {
    TravelStop.findByIdAndUpdate(req.params.id,req.body.editcamp,function(err,updated){
        if(err){
            res.redirect("/places");
        }
        else{
            res.redirect("/places/"+ req.params.id);
        }
    });
});

router.delete("/:id",authorize.checkplacesownership,function(req, res) {
    TravelStop.findByIdAndRemove(req.params.id,function(err,found){
        if(err){
            console.log(err);
        } else {
            res.redirect("/places");
        }
    });
});

module.exports = router;

