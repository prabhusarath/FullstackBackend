var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var TravelStop = require("./models/travel");
var comments = require("./models/comments");
var User = require("./models/user");
var popdata = require("./dbdata");

mongoose.connect("mongodb://localhost/travellers_stop");
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({extended: true}));
popdata();


app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog !",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




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

app.get("/places/:id/comments/new",isLoggedIn ,function(req,res){
    TravelStop.findById(req.params.id,function(err,ans){
        if(err){
            console.log(err);
        } else {
            res.render("comments/newcomments",{views:ans});
        }
    });
});

app.post("/places/:id/comments",isLoggedIn,function(req,res){
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

app.get("/register",function(req, res) {
   res.render("register"); 
});

app.post("/register",function(req, res) {
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

app.get("/login",function(req, res) {
    res.render("login");
});

app.post("/login",passport.authenticate("local",
    {
    successRedirect: "/places",
    failureRedirect: "/login" }),function(req, res) {
 
});


app.get("/logout",function(req, res){
    req.logout();
    res.redirect("/places");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Travellers Stop has Started Successfully!!");
});