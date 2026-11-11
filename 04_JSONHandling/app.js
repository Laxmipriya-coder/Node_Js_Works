
const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const filePath = path.join(__dirname, "data", "data.json");

// Create file if not exists
if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, "[]");
}

// Get input
function getInput(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

// Read tasks
function getTasks() {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Save tasks
function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Main menu
async function todolist() {

    const option = await getInput(`
===== TODO LIST =====

1. Add Task
2. View Tasks
3. Update Task
4. Delete Task
5. Complete Task
6. Delete Completed Tasks
7. Exit

Enter Option: `);

    switch (option) {

        case "1":
            await addTask();
            break;

        case "2":
            viewTasks();
            break;

        case "3":
            await updateTask();
            break;

        case "4":
            await deleteTask();
            break;

        case "5":
            await completeTask();
            break;

        case "6":
            deleteCompletedTask();
            break;

        case "7":
            console.log("Thank you!");
            rl.close();
            return;

        default:
            console.log("Invalid Option!");
    }

    todolist();
}

// Add Task
async function addTask() {

    const task = await getInput("Enter Task: ");

    if (task === "") {
        console.log("Task cannot be empty!");
        return;
    }

    const tasks = getTasks();

    tasks.push({
        title: task,
        completed: false
    });

    saveTasks(tasks);

    console.log("Task Added!");
}

// View Tasks
function viewTasks() {

    const tasks = getTasks();

    if (tasks.length === 0) {
        console.log("No Tasks Found!");
        return;
    }

    console.log("\n===== TASKS =====");

    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.title} - ${task.completed ? "Completed" : "Pending"}`);
    });
}

// Update Task
async function updateTask() {

    const tasks = getTasks();

    viewTasks();

    const num = await getInput("Enter Task Number: ");
    const index = Number(num) - 1;

    if (index < 0 || index >= tasks.length) {
        console.log("Invalid Task Number!");
        return;
    }

    const newTask = await getInput("Enter New Task: ");

    if (newTask === "") {
        console.log("Task cannot be empty!");
        return;
    }

    tasks[index].title = newTask;

    saveTasks(tasks);

    console.log("Task Updated!");
}

// Delete Task
async function deleteTask() {

    const tasks = getTasks();

    viewTasks();

    const num = await getInput("Enter Task Number: ");
    const index = Number(num) - 1;

    if (index < 0 || index >= tasks.length) {
        console.log("Invalid Task Number!");
        return;
    }

    tasks.splice(index, 1);

    saveTasks(tasks);

    console.log("Task Deleted!");
}

// Complete Task
async function completeTask() {

    const tasks = getTasks();

    viewTasks();

    const num = await getInput("Enter Task Number: ");
    const index = Number(num) - 1;

    if (index < 0 || index >= tasks.length) {
        console.log("Invalid Task Number!");
        return;
    }

    tasks[index].completed = true;

    saveTasks(tasks);

    console.log("Task Completed!");
}

// Delete Completed Tasks
function deleteCompletedTask() {

    const tasks = getTasks();

    const remainingTasks = tasks.filter(task => task.completed === false);

    saveTasks(remainingTasks);

    console.log("Completed Tasks Deleted!");
}

// Start
todolist();
