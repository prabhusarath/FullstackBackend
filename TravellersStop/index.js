var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOveride = require("method-override");
var TravelStop = require("./models/travel");
var comments = require("./models/comments");
var User = require("./models/user");
var popdata = require("./dbdata");


var placesRoutes = require("./routes/places.js"),
    appRoutes = require("./routes/app.js"),
    userRoutes = require("./routes/user_comments.js");

mongoose.connect("mongodb://localhost/travellers_stop");
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOveride("_method"));


//Auto Data Population
//popdata();

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

app.use(function(req,res,next){
   res.locals.currUser = req.user; 
   next();
});

app.use("/",appRoutes);
app.use("/places",placesRoutes);
app.use("/places/:id/comments",userRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Travellers Stop has Started Successfully!!");
});