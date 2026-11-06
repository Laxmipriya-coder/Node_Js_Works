
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
    const option = await getInput(`Which operation you want to perform? \n1. Create a File \n2. Read a File \n3. Update a File \n4. Delete a File \n Enter your choice: `);
    switch (option) {
        case "1":
            FileRead();
            break;
        case "2":
            ReadFile();
            break;
        case "3":
            console.log("Update a file");
            break;
        case "4":
            console.log("Delete a file");
            break;
        default:
            console.log("Invalid Option");
            rl.close()
    }
}

filemanagement();

async function FileRead() {
    const filname = await getInput("Enter a FileName : ");
    if (Number(filname[0])) {
        console.log("Invalid File Name");
        return;
    }
    try {
        fs.writeFileSync(`./${filname}.txt`, "");
        console.log("File Created");
        const options = ["yes", "no"];
        let res;
        do {
            res = await getInput("Do you want to add any data? yes/no : ");
            if (res.toLowerCase() === "yes") {
                const data = await getInput("Enter the data : ");
                fs.appendFileSync(`./${filname}.txt`, data + "\n");
                console.log("Data Added Successfully");
                rl.close();
            }
            else if (res.toLowerCase() === "no") {
                console.log("Thank You");
                rl.close();
                return;
            }
            else {
                console.log("Invalid Input. Please enter yes or no.");
            }
        }
        while (!options.includes(res.toLowerCase()));
    }
    catch (error) {
        console.log("Something Went Wrong .... Please try again.........");
        rl.close();
    }
}

async function ReadFile() {
    const filname = await getInput("Enter a FileName : ");

    try {
        if (fs.existsSync(`./${filname}.txt`)) {
            const data = fs.readFileSync(`./${filname}.txt`, "utf-8");
            console.log("Reading a File");
            console.log(data);
        }
        else {
            console.log("File Does Not Exist");
        }
    }
    catch (error) {
        console.log("Something Went Wrong .... Please try again.........");
    }

    rl.close();
}
