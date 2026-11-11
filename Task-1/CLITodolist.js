
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fileName = "./tasks.json";

function getInput(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

// Save tasks
function saveTasks(tasks) {
    fs.writeFileSync(fileName, JSON.stringify(tasks, null, 2));
}

// Create new task
async function addTask() {

    const taskName = await getInput("Enter task name: ");

    if (taskName.trim() === "") {
        console.log("Task name cannot be empty!");
        return todolist();
    }

    let tasks = [];

    if (fs.existsSync(fileName)) {
        const data = fs.readFileSync(fileName, "utf8");
        tasks = JSON.parse(data);
    }

    const newTask = {
        id: Date.now(),
        title: taskName.trim(),
        completed: false
    };

    tasks.push(newTask);

    saveTasks(tasks);
    console.log("Task added successfully!");

    todolist();
}

async function todolist() {

    const option = await getInput(`Todo List \n1. Add New Task \n2. Exit \nEnter your option: 
    `);

    switch (option) {

        case "1":
            await addTask();
            break;

        case "2":
            console.log("Thank you! Goodbye.");
            rl.close();
            return;

        default:
            console.log("Invalid option!");
            todolist();
            break;
    }
}

todolist();
