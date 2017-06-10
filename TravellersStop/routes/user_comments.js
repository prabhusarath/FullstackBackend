var express = require("express");
var router = express.Router();
var TravelStop = require("../models/travel");
var comments = require("../models/comments"); 


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


router.get("/places/:id/comments/new",isLoggedIn ,function(req,res){
    TravelStop.findById(req.params.id,function(err,ans){
        if(err){
            console.log(err);
        } else {
            res.render("comments/newcomments",{views:ans});
        }
    });
});

router.post("/places/:id/comments",isLoggedIn,function(req,res){
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


module.exports = router;