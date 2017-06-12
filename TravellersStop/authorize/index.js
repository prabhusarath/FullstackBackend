var express = require("express");

var TravelStop = require("../models/travel");
var comments = require("../models/comments"); 

var authorize ={};
    
authorize.checkcommentsownership = function(req,res,next){
    if(req.isAuthenticated()){
       comments.findById(req.params.comment_id,function(err,editcomm){
        if(err){
            res.redirect("back");
        }
        else{
            console.log(editcomm);
            if(editcomm.traveller.id.equals(req.user._id)){
                next();
            }else{
                res.redirect("back");
            }
        }
    }); 
        
    }else{
        res.redirect("back");
    }
};

authorize.checkplacesownership= function(req,res,next){
 
    if(req.isAuthenticated()){
       TravelStop.findById(req.params.id,function(err,editcamp){
        if(err){
            res.redirect("back");
        }
        else{
            
            if(editcamp.writtenby.id.equals(req.user._id)){
                next();
            }else{
                res.redirect("back");
            }
        }
    }); 
        
    }else{
        res.redirect("back");
    }
    
}

authorize.isLoggedIn= function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = authorize;