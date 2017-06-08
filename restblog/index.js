var express = require("express"),
methodOveride = require("method-override"),
mongoose = require("mongoose"),
bodyParser =require("body-parser");

var exapp = express();

mongoose.connect("mongodb://localhost/blogs");

exapp.set("view engine","ejs");
exapp.use(express.static("public"));
exapp.use(bodyParser.urlencoded({extended: true}));
exapp.use(methodOveride("_method"));

var blogs = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   creation: {type: Date, default: Date.now}
});

var blogvar = mongoose.model("blogitem",blogs);

// exapp.get("/",function(req,res){
//     //res.render("blogs");
    
// });

//INDEX
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

// nEW rOUTE
exapp.get("/blogs/new",function(req,res){
  res.render("newblogs");
});

// POST nEW rOUTE
exapp.post("/blogs",function(req,res){
    
blogvar.create(req.body.blog,function(err,ans){
        if(err){
            console.log(err);
            res.render("newblogs");
        } else {
            //res.render("places",{ResPlaces: ans});
            console.log(ans);
            res.redirect("/blogs");
        }
    });
    
    });

exapp.get("/blogs/:id",function(req,res){
    //res.send("Hello Toufeeq")
    
    blogvar.findById(req.params.id,function(err,found){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("showsblogs",{ccc: found});
        }
    });
    
});

//edit route
exapp.get("/blogs/:id/edit",function(req,res){
    blogvar.findById(req.params.id,function(err,found){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("editblogs",{blogss: found});
        }
    });
});

//update route
exapp.put("/blogs/:id",function(req,res){
    blogvar.findByIdAndUpdate(req.params.id,req.body.blogss,function(err,found){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

exapp.delete("/blogs/:id",function(req,res){
    blogvar.findByIdAndRemove(req.params.id,function(err,found){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});

exapp.listen(process.env.PORT,process.env.IP,function(){
   console.log("Travellers Stop has Started Successfully!!");
});



