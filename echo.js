function avg(a){
    var sum =0;
    for(var i=0;i<a.length;i++){
        sum += a[i]
    }
    var av = sum/a.length
    
    return Math.round(av)
}


var sc=[90,98,89,100,100,86,94];
console.log(avg(sc))
