var mongoose=require("mongoose")

var schemas =new mongoose.Schema({
  comment:String,
  traveller:String
});

module.exports = mongoose.model("Comment",schemas);