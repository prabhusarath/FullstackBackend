var express = require("express"),
mongoose = require("mongoose"),
bodyParser =require("body-parser");

var exapp = express();

mongoose.connect("mongodb://localhost/blogs");

exapp.set("view engine","ejs");
exapp.use(express.static("public"));
exapp.use(bodyParser.urlencoded({extended: true}));

var blogs = new mongoose.schema({
   title: String,
   image: String,
   body: String,
   creation: {type: Date, default: Date.now}
});

var blogvar = mongoose.model("blogitems",blogs);

exapp.listen(process.env.PORT,process.env.IP,function(){
   console.log("Travellers Stop has Started Successfully!!");
});



