
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create folder and JSON file
if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
}

if (!fs.existsSync("./data/data.json")) {
    fs.writeFileSync("./data/data.json", "[]");
}

// Get Input
function getInput(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

// Main Menu
async function todolist() {

    const option = await getInput(`TODO LIST \n1. Add Task\n2. View Tasks\n3. Complete Task\n4. Delete Completed Tasks\n5. Exit\nEnter your option: `);

    switch (option) {

        case "1":
            await addTask();
            todolist();
            return;

        case "2":
            viewTasks();
            todolist();
            return;

        case "3":
            await completeTask();
            todolist();
            return;

        case "4":
            deleteCompleted();
            todolist();
            return;

        case "5":
            console.log("Thank you Bye🤩🤩🤩");
            rl.close();
            return;

        default:
            console.log("Invalid Option😏🥱");
            todolist();
            return;
    }
}

// Add Task
async function addTask() {

    const task = await getInput("Enter your task: ");

    if (task.trim() === "") {
        console.log("Task cannot be empty!");
        return;
    }

    let alltasks = JSON.parse(
        fs.readFileSync("./data/data.json", "utf8")
    );

    alltasks.push({
        id: alltasks.length + 1,
        name: task,
        completed: false
    });

    fs.writeFileSync(
        "./data/data.json",
        JSON.stringify(alltasks, null, 2)
    );

    console.log("Task Added Successfully!");
}

// View Tasks
function viewTasks() {

    let alltasks = JSON.parse(
        fs.readFileSync("./data/data.json", "utf8")
    );

    if (alltasks.length === 0) {
        console.log("No Tasks Found!");
        return;
    }

    console.log("ENTER YOUR TASK");

    alltasks.forEach((task) => {

        console.log(
            `${task.id}. ${task.name} - ${task.completed ? "Completed" : "Pending"
            }`
        );

    });
}

// Complete Task
async function completeTask() {

    let alltasks = JSON.parse(
        fs.readFileSync("./data/data.json", "utf8")
    );

    if (alltasks.length === 0) {
        console.log("No Tasks Found!");
        return;
    }

    viewTasks();

    const id = await getInput("Enter Task ID to complete: ");

    let task = alltasks.find((task) => task.id === Number(id));

    if (!task) {
        console.log("Invalid Task ID!");
        return;
    }

    task.completed = true;

    fs.writeFileSync(
        "./data/data.json",
        JSON.stringify(alltasks, null, 2)
    );

    console.log("Task Completed Successfully!");
}

// Delete Completed Tasks
function deleteCompleted() {

    let alltasks = JSON.parse(
        fs.readFileSync("./data/data.json", "utf8")
    );

    let remainingTasks = alltasks.filter((task) => {
        return task.completed === false;
    });

    if (remainingTasks.length === alltasks.length) {
        console.log("No Completed Tasks Found!");
        return;
    }

    fs.writeFileSync(
        "./data/data.json",
        JSON.stringify(remainingTasks, null, 2)
    );

    console.log("Completed Tasks Deleted Successfully!");
}

// Start Application
todolist();
