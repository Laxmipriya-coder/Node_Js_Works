const express = require("express");

const app = express();

console.log("Hii");

// GET REQUEST
app.get("/",(req,res)=>{
    res.json({
        message:"Hii From get method"
    })
});

// POST Request
app.post("/add",(req,res)=>{
    res.json({
        message:"Hello From Post Method"
    })
})

// PUT Request
app.put("/update",(req,res)=>{
    res.json({
        message:"Hello From Put Method"
    })
})

// DELETE Request
app.delete("/delete",(req,res)=>{
    res.json({
        message:"Hello From Delete Method"
    })
})


app.listen(8090,()=>{
    console.log("Server Started...");
})

