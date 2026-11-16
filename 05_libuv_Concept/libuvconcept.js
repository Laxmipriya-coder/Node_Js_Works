const fs = require("fs");

console.log("1, Start");

setTimeout(()=>{
    console.log("2, setTimeout");
},0);

setImmediate(()=>{
    console.log("3, setImmediate");
})

Promise.resolve().then(()=>{
    console.log("4, Promise");
});

process.nextTick(()=>{
    console.log("5, nextTick");
});

fs.readFile(__filename,()=>{
    console.log("6, File read");

    setTimeout(()=>{
        
    })
})