var ex = require("express");
var apps = ex();

apps.get("/",function(req,res){
   res.send("Hi There, welcome to my Assignment!") 
});

apps.get("/speak/:val",function(req,res){
    var vv = req.params.val;
    
    if(vv == "pig")
    {
    res.send("Hi "+vv+ " says Oink")
    }else if( vv == "cow"){
    res.send("Hi "+vv+ " says Moo")
    }else{
    res.send("Hi "+vv+ " says Bark Bark")
    }
    
});

apps.get("/repeat/hello/:count",function(req,res){
    var dd = req.params.count;
    var str = "";
    
    for(var i=0;i<dd;i++){
    str = str + "hello" ;   
    }
    
    res.send(str);
    
});

apps.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server Started Successfully!!") 
});