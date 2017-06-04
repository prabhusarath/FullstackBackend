var mong = require("mongoose");

mong.connect("mongodb://localhost/demos");

var schm = new mong.Schema({
   name:String,
   Phone:Number
});

var dem = mong.model("dogs",schm);

var jith = new dem({
    name:"Saarth",
    Phone: 12345
});

jith.save(function(err,aa){
   if(err){
       console.log("Wrong")
   }
   else{
       console.log("Okay");
       console.log(aa);
   }
  });