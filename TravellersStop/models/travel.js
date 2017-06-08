var mongoose=require("mongoose")

var schemas =new mongoose.Schema({
  name:String,
  image:String,
  descp:String
});

module.exports = mongoose.model("TravelStop",schemas);