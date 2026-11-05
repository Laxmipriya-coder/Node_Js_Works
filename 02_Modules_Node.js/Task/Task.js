
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getInput(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function calculator() {

    const op = await getInput("Which operation You want to perform : ");

    const a = await getInput("Enter your first value : ");

    const b = await getInput("Enter your Second value : ");

    let num1 = Number(a);
    let num2 = Number(b);
    let result;

    if (op === "+") {
        result = num1 + num2;
    }
    else if (op === "-") {
        result = num1 - num2;
    }
    else if (op === "*") {
        result = num1 * num2;
    }
    else if (op === "/") {
        result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
    }
    else if(op === "%"){
        result = num2 !== 0 ? num1 % num2 : "Cannot divide by zero" ; 
    }
    else {
        result = "Invalid operation";
    }

    console.log("YOUR RESULT IS:", result);

    rl.close();
}

calculator();
