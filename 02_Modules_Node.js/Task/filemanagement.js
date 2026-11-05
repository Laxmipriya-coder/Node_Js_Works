
const fs = require("fs");
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

async function filemanagement() {

    const option = await getInput(`Which operation you want to perform? \n1. Create a File \n2. Read a File \n3. Update a File \n4. Delete a File \n Enter your choice: `
    );

    switch (option) {

        case "1":
            console.log("File Created Successfully");
            break;

        case "2":
            console.log("Reading a File");
            break;

        case "3":
            console.log("Update a file");
            break;

        case "4":
           console.log("Delete a file");
            break;

        default:
            console.log("Invalid Option");
    }

    rl.close();
}

filemanagement();

async function FileRead() {
    const filname = await getInput("Enter a FileName : ");
    if(Number(filname[0])){
        console.log("Invalid File Name");
        rl.close();
        return
    }
    fs.writeFileSync(`./${filname}.txt`,"")

}
