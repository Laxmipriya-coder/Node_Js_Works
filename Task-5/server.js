const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            message: "WELCOME TO MY SERVER"
        }));
    }

    // ALL USERS(GET METHOD)  ||  (IF NO USERS FOUND RETURN)[]
    else if (req.method === "GET" && req.url === "/allusers") {
        const data = fs.readFileSync("./users/users.json", "utf8");
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(data);
    }

    // CREATE USERS(POST METHOD)
    else if (req.method === "POST" && req.url === "/adduser") {
        let body = "";
        req.on("data", (ele) => {
            body += ele;
        });
        req.on("end", () => {
            const newUser = JSON.parse(body);
            if (!validateEmail(newUser.email)) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    message: "Invalid Email"
                }));
                return;
            }
            const data = JSON.parse(fs.readFileSync("./users/users.json", "utf8"));
            newUser.id = Date.now();
            data.push(newUser);

            fs.writeFileSync("./users/users.json", JSON.stringify(data, null, 2));
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                message: "Registration Completed Successfully",
                data: newUser
            }));
        });
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            message: "INVALID CREDENTIAL"
        }));
    }

});

server.listen(8090, () => {
    console.log("Server running on port 8090");
});


function validateEmail(email){
    if(email && email.includes('@') && email.includes('gmail.com')){
        return true
    }
    else{
        return false
    }
}