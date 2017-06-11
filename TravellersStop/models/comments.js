var mongoose=require("mongoose");

var schemas =new mongoose.Schema({
  texts:String,
  traveller: {
    username : String,
    id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }
});

module.exports = mongoose.model("Comment",schemas);