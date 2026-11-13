const http = require("http");

const server = http.createServer((req,res)=>{
    if(req.method === "GET" && req.url === "/"){
        res.write("Hello User, I am from server")
        res.end();
    }
    else if(req.method === "GET" && req.url === "/allusers"){
        res.write("Hello From All users");
        res.end();
    }
})

server.listen(8090,()=>{
    console.log("Server Started.........");
})