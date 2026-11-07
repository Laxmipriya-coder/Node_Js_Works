const readline = require("readline");
const fs = require("fs");
const { stdin, stdout } = require("process");

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

function getInput(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function todolist() {

    const option = await getInput(
        `Which type of task you want to perform?
1. Add a Task
2. Read a Task
3. Update a Task
4. Delete a Task
5. Exit
Enter your Option Here: `
    );

    switch (option) {

        case "1": {
            console.log("Add a Task Completed");
            todolist();
            return;
        }

        case "2": {
            console.log("Read the task completed");
           readFile();
            return;
        }

        case "3": {
            console.log("Update the task completed");
            todolist();
            return;
        }

        case "4": {
            console.log("Delete the task Successfully");
            todolist();
            return;
        }

        case "5": {
            console.log("Thank you for using To-Do List!");
            rl.close();
            return;
        }

        default: {
            console.log("Invalid Option");
            todolist();
            return;
        }
    }
}

todolist();

async function readFile(params) {
    const files = fs.readdirSync("./data")
    files.map((file,index)=>{
        console.log(`${index + 1}.${file}`);
    })
    const fileName = await getInput("Enter the file name: ")
    const allusers = JSON.parse(fs.readFileSync(`./data/${fileName},"utf8`))
    allusers.map((user)=>{
        console.log(`${user.id}.${user.name}`);
    })
    todolist();
}

async function writeFile(params) {
    
}