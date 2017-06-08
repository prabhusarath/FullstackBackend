var mongoose = require("mongoose"),
    TravelStop = require("./models/travel"),
    Comment=require("./models/comments");

var datacamp = [{
    name:"Sarath",
    image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
    descp:"Hello From Sarath"
    },{
    name:"Udhay",
    image:"https://farm9.staticflickr.com/8456/8006869967_de2ed3e564.jpg",
    descp:"Hello From Sarath"
    },{
    name:"Prabhu",
    image:"https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
    descp:"Hello From Sarath"
    },{
    name:"Juno",
    image:"https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg",
    descp:"Hello From Sarath"
    },{
    name:"Selvi",
    image:"https://farm8.staticflickr.com/7293/9705520990_c914a4c524.jpg",
    descp:"Hello From Sarath"
    }];
    
    function delDB(){
        
        TravelStop.remove({},function(err,aa){
          if(err){
              console.log("Date DELETE Error");
          }
          else{
          console.log("Data Clean Success");
            datacamp.forEach(function(datad){
              TravelStop.create(datad,function(err,datades){
              if(err){
                  console.log("Wrong");
              }else{
                  console.log("Data Added Success");
                    Comment.create({
                        comment:"Place is Nice !!",
                        traveller:"Sarath Prabhakaran"
                    },function(err,comm){
                          if(err){
                              console.log("Error Comment");
                          }else{
                              datades.views.push(comm);
                              datades.save();
                              console.log("Comments Added Success");
                          }
                          });
              }
                  
              });
          }); 
        }
    });
}

module.exports = delDB;
