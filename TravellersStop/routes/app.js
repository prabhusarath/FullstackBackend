var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")


router.get("/",function(req,res){
    res.render("home");
});


router.get("/register",function(req, res) {
   res.render("register"); 
});

router.post("/register",function(req, res) {
   var usname = new User({username: req.body.username});
   User.register(usname, req.body.password, function(err,ans){
        if(err){
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/places");
            })
        }
    });
});

router.get("/login",function(req, res) {
    res.render("login");
});

router.post("/login",passport.authenticate("local",
    {
    successRedirect: "/places",
    failureRedirect: "/login" }),function(req, res) {
 
});


router.get("/logout",function(req, res){
    req.logout();
    res.redirect("/places");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;