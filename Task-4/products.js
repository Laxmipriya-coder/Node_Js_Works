
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        res.write("Welcome to my Server......");
        res.end();
    }
    else if (req.method === "GET" && req.url === "/products") {
        const data = fs.readFileSync('./products/products.json', 'utf8')
        res.write(data);
        res.end();
    }
    // else if(req.method === "POST" && req.url ==="/addproduct"){
       
    //     let body = ""
    //     req.on("data",(data)=>{
    //         body += data.toString()
    //     })
    //     req.on("end",()=>{
    //         const allusers = JSON.parse()
    //     })
    //     res.write("Add Products Successfully");
    //     res.end();
    // }
});

server.listen(8090, () => {
    console.log("Server is Running");
});
