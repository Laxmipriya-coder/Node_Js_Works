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

async function askme() {
    const name = await getInput("What is your Name: ");
    const age = await getInput("What is your Age: ");

    console.log("Your Name is:", name);
    console.log("Your Age is:", age);

    rl.close();
}

askme();

// CREATE A CALCULATION PROGRAM
// WHICH OPERATION : +
// ENTER FIRST VALUE : 10
// ENTER SECOND VALUE : 20
// YOUR RESULT IS: 30

// IF I CHOOSE
//  WHICH OPERATION : -
// ENTER FIRST VALUE : 100
// ENTER SECOND VALUE : 80
// YOUR RESULT IS: 20