var fk = require('faker');


for(var i=0;i<10;i++){
    var randomName = fk.commerce.productName(); 
    var randomPrice = fk.commerce.price(); 

    console.log(randomName)
    console.log(randomPrice)
}
