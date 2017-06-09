var mongoose=require("mongoose")

var schemas =new mongoose.Schema({
  name:String,
  image:String,
  descp:String,
  views:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref: "Comment"
      }]
});

module.exports = mongoose.model("TravelStop",schemas);