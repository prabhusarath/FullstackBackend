var mong = require("mongoose");

mong.connect("mongodb://localhost/demos");

var schm = new mong.Schema({
   name:String,
   Phone:Number
});

var dem = mong.model("dogs",schm);

// var jith = new dem({
//     name:"UD",
//     Phone: 32332
// });

// jith.save(function(err,aa){
//   if(err){
//       console.log("Wrong");
//   }
//   else{
//       console.log("Okay");
//       console.log(aa);
//   }
//   });
  
  dem.find({},function(err,aa){
   if(err){
       console.log("Wrong");
       console.log(err);
   }
   else{
       console.log("Okay");
       console.log(aa);
   }
  });