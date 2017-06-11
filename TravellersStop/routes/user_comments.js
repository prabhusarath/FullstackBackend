var express = require("express");
var router = express.Router({mergeParams: true});
var TravelStop = require("../models/travel");
var comments = require("../models/comments"); 


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


router.get("/new",isLoggedIn ,function(req,res){
    TravelStop.findById(req.params.id,function(err,ans){
        if(err){
            console.log(err);
        } else {
            res.render("comments/newcomments",{views:ans});
        }
    });
});

router.post("/",isLoggedIn,function(req,res){
    TravelStop.findById(req.params.id,function(err,ans){
        if(err){
            res.redirect("/places");
        } else 
        {
                        
                        comments.create(req.body.comms,function(err,viewans){
                        if(err){
                            console.log(err);
                        } else {
                            viewans.traveller.id = req.user._id;
                            viewans.traveller.username = req.user.username;
                            viewans.save();
                            
                            ans.views.push(viewans);
                            ans.save();
                            res.redirect("/places/"+ans._id);
                        }
                        });
        }
    });
});


module.exports = router;