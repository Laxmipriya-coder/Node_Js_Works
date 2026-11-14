const http = require('http');
const fs = require('fs');

// CREATE SERVER
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === "/") {
        res.writeHead(200, { 'content-type': "application/json" });
        res.end(JSON.stringify({
            message: "WELCOME to MY SERVER............."
        }));
    }

    // GET ALL USERS(GET METHOD)
    else if (req.method === "GET" && req.url === "/allusers") {
        const data = fs.readFileSync("./users/users.json", 'utf8');
        res.writeHead(200, {
            "content-type": "application/json"
        });
        res.end(data);
    }

    // ADD USERS(POST METHOD)
    else if (req.method === "POST" && req.url === "/addusers") {
        let body = "";
        req.on("data", (ele) => {
            body += ele;
        })
        req.on("end", () => {
            const newUSer = JSON.parse(body)
            // VALIDATE EMAIL
            if (!validateEmail(newUSer.email)) {
                res.writeHead(400, {
                    "Content-type": "application/json"
                });
                res.end(JSON.stringify({
                    message: "Invalid Email, Failed to add users"
                }));
                return;
            }
            if (!validatePassword(newUSer.pass)) {
                res.writeHead(400, {
                    "Content-type": "application/json"
                })
                res.end(JSON.stringify({
                    message: "Invalid Password........"
                }));
                return;
            }
            const data = JSON.parse(fs.readFileSync("./users/users.json", 'utf8'));
            // IF Email is already Present
            for (let i = 0; i < data.length; i++) {
                if (data[i].email === newUSer.email) {
                    res.writeHead(400, {
                        'Content-type': "application/json"
                    });
                    res.end(JSON.stringify({
                        message: "Email is already registered"
                    }));
                    return;
                }
            }
            newUSer.id = Date.now();
            data.push(newUSer);

            fs.readFileSync("./users/users.json", JSON.stringify(data, null, 2));
            res.writeHead(201, {
                "content-type": "application/json"
            })
            res.end(JSON.stringify({
                message: "Registration Completed Successfully",
                data: newUSer
            }));
        });
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            message: "INVALID CREDENTIAL"
        }));
    }
})

// START SERVER 
server.listen(8090, () => {
    console.log("Server Running on port 8090");
})

function validateEmail(email) {
    if (typeof email !== "string" || email.length === 0) {
        return false;
    }
    if (email[0] === 'a' && email[0] <= 'z' &&
        email.includes('@') &&
        email.indexOf('@') === email.lastIndexOf('@') &&
        email.endsWith('gmail.com') &&
        email.indexOf('gmail.com') === email.lastIndexOf('gmail.com') &&
        email.indexOf('@') > 0 &&
        email === email.toLowerCase() &&
        !email.includes("")
    ) {
        return true;
    }
    return false;
}

function validatePassword(pass) {
    let upper = false;
    let lower = false;
    let number = false;
    let special = false;

    if (typeof pass !== 'string' || pass.length < 8) {
        return false;
    }

    for (let i = 0; i < pass.length; i++) {
        let ch = pass.charCodeAt(i);
        if (ch >= 65 && ch <= 90) {
            upper = true;
        }
        else if (ch >= 97 && ch <= 122) {
            lower = true;
        }
        else if (ch >= 48 && ch <= 57) {
            number = true;
        }
        else if (ch !== 32) {
            special = true;
        }
        else {
            return false
        }
    }
    return upper && lower && number && special;
}
