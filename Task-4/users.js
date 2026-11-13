
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    // GET - Welcome message
    if (req.method === "GET" && req.url === "/") {
        res.write("WELCOME TO MY SERVER");
        res.end();
    }

    // GET - Get all users
    else if (req.method === "GET" && req.url === "/allusers") {
        try {
            const data = fs.readFileSync("./users/users.json", "utf8");

            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(data);
            res.end();

        } catch (error) {
            res.writeHead(500);
            res.end("Failed to fetch users");
        }
    }

    // POST - Add new user
    else if (req.method === "POST" && req.url === "/adduser") {

        let body = "";

        req.on("data", (data) => {
            body += data.toString();
        });

        req.on("end", () => {
            try {
                const newUser = JSON.parse(body);

                const allusers = JSON.parse(
                    fs.readFileSync("./users/users.json", "utf8")
                );

                allusers.push(newUser);

                fs.writeFileSync(
                    "./users/users.json",
                    JSON.stringify(allusers, null, 2)
                );

                res.writeHead(201, { "Content-Type": "text/plain" });
                res.end("User added successfully");

            } catch (error) {
                res.writeHead(400);
                res.end("Failed to add user");
            }
        });
    }

    // DELETE - Delete user by ID

    else if (req.method === "DELETE" && req.url === "/deleteuser") {

        let body = "";

        req.on("data", (data) => {
            body += data.toString();
        });

        req.on("end", () => {
            try {
                const { id } = JSON.parse(body);

                const allusers = JSON.parse(
                    fs.readFileSync("./users/users.json", "utf8")
                );

                const userIndex = allusers.findIndex(
                    (user) => user.id == id
                );

                if (userIndex === -1) {
                    res.writeHead(404);
                    res.end("User not found");
                    return;
                }

                allusers.splice(userIndex, 1);

                fs.writeFileSync(
                    "./users/users.json",
                    JSON.stringify(allusers, null, 2)
                );

                res.writeHead(200);
                res.end("User deleted successfully");

            } catch (error) {
                console.log("Delete Error:", error);

                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Failed to delete user: " + error.message);
            }
        });
    }
    // Invalid route
    else {
        res.writeHead(404);
        res.end("Route not found");
    }

});

server.listen(8090, () => {
    console.log("Server is Running on port 8090");
});
