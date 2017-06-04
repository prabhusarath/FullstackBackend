var mong = require("mongoose");

mong.connect("mongodb://localhost/demos");

var schm = new mong.Schema({
   name:String,
   Phone:Number
});