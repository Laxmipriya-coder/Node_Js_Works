const fs = require("fs")

const read = fs.createReadStream('./bigfile.txt')

read.on("data",(chunk)=>{
    console.log(chunk.length);
})

read.on("end",()=>{
    console.log("Reading Completed........");
})