var express = require("express");
var router = express.Router({mergeParams: true});
var TravelStop = require("../models/travel");
var comments = require("../models/comments"); 

var authorize = require("../authorize");


router.get("/new",authorize.isLoggedIn ,function(req,res){
    TravelStop.findById(req.params.id,function(err,ans){
        if(err){
            console.log(err);
        } else {
            res.render("comments/newcomments",{views:ans});
        }
    });
});

router.post("/",authorize.isLoggedIn,function(req,res){
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

router.get("/:comment_id/edit",authorize.checkcommentsownership,function(req,res){
   
   comments.findById(req.params.comment_id,function(err, foundid) {
       if(err){
           res.redirect("back");
       }else{
          res.render("comments/edit",{placeid: req.params.id,comments:foundid }); 
       }
   });    
   
});


router.put("/:comment_id",authorize.checkcommentsownership,function(req,res){
    comments.findByIdAndUpdate(req.params.comment_id,req.body.comments,function(err,updated){
        
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/places/"+ req.params.id);
        }
    });
});

router.delete("/:comment_id",authorize.checkcommentsownership,function(req, res) {
    comments.findByIdAndRemove(req.params.comment_id,function(err,found){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/places/"+ req.params.id);
        }
    });
});

module.exports = router;