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
            // VALIDATE EMAIL ID 
            if (!validateEmail(newUser.email)) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    message: "Invalid Email, User not Register"
                }));
                return;
            }
            // VALIDATE THE PASSWORD
            if (!validatePassword(newUser.pass)) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    message: "Invalid Password"
                }))
                return;
            }
            const data = JSON.parse(fs.readFileSync("./users/users.json", "utf8"));
            // CHECK IF EMAIL ALREADY EXISTS
            for (let i = 0; i < data.length; i++) {
                if (data[i].email === newUser.email) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        message: "Email is already registered"
                    }));
                    return;
                }
            }
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




function validateEmail(email) {
    if (typeof email !== "string" || email.length === 0) {
        return false;
    }
    if (email[0] >= "a" && email[0] <= "z" &&
        email.includes("@") &&
        email.indexOf("@") === email.lastIndexOf("@") &&
        email.endsWith("gmail.com") &&
        email.indexOf("gmail.com") === email.lastIndexOf("gmail.com") &&
        email.indexOf("@") > 0 &&
        email === email.toLowerCase() &&
        !email.includes(" ")
    ) {
        return true;
    }

    return false;
}

function validatePassword(pass) {
    let upper = false, lower = false, number = false, special = false;
    if (typeof pass !== "string" || pass.length < 8) {
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
            special = true
        }
        else {
            return false;
        }
    }
    return upper && lower && number && special;
}
