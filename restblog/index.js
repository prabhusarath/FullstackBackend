var express = require("express"),
mongoose = require("mongoose"),
bodyParser =require("body-parser");

var exapp = express();

mongoose.connect("mongodb://localhost/blogs");

exapp.set("view engine","ejs");
exapp.use(express.static("public"));
exapp.use(bodyParser.urlencoded({extended: true}));

var blogs = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   creation: {type: Date, default: Date.now}
});

var blogvar = mongoose.model("blogitem",blogs);

exapp.get("/",function(req,res){
    res.render("blogs");
    
});

exapp.get("/blogs",function(req,res){
    //res.render("blogs");
    blogvar.find({},function(err,data){
        if(err){
            console.log("Err");
        }else{
            res.render("blogs",{blogdata:data})
        }
    })
    
});


// exapp.post("/blogs",function(req,res){

//     });

// exapp.get("/places/new",function(req,res){
//   res.render("newplaces");
// });

// exapp.get("/places/:id",function(req,res){
    
// });

exapp.listen(process.env.PORT,process.env.IP,function(){
   console.log("Travellers Stop has Started Successfully!!");
});



