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


async function notesApp() {
    const option = await getInput(`Personal App \n1. Create Note\n2. Read Saved Notes\n3. Search Notes\n4. Edit Note\n5. Delete Note\n6. Exit\nEnter your option: `);
    switch (option) {
        case "1":
            await createNote();
            notesApp();
            return;
        case "2":
            await readNotes();
            notesApp();
            return;
        case "3":
            await searchNotes();
            notesApp();
            return;
        case "4":
            await editNote();
            notesApp();
            return;
        case "5":
            await deleteNote();
            notesApp();
            return;
        case "6":
            console.log("Thank you Bye!");
            rl.close();
            return;
        default:
            console.log("Invalid Option😏🥱");
            notesApp();
            return;
    }
}


async function createNote() {
    const title = await getInput("Enter Note Title: ");
    const content = await getInput("Enter Note Content: ");
    const files = fs.readdirSync("./notes");
    if (files.includes(title + ".txt")) {
        console.log("Note Already Exists!");
        return;
    }
    fs.writeFileSync("./notes/" + title + ".txt", content);
    console.log("Note Created Successfully!");
}


async function readNotes() {
    const files = fs.readdirSync("./notes");
    if (files.length === 0) {
        console.log("No Notes Found!");
        return;
    }
    console.log("\nSAVED NOTES");
    files.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });
    const title = await getInput("Enter Note Title: ");
    const filename = title + ".txt";
    if (!files.includes(filename)) {
        console.log("Note Not Found!");
        return;
    }
    const content = fs.readFileSync("./notes/" + filename, "utf8");
    console.log("\nNote Content:", content);
}


async function searchNotes() {
    const files = fs.readdirSync("./notes");
    const title = await getInput("Enter Title to Search: ");
    const result = files.filter((file) => {
        return file.toLowerCase().includes(title.toLowerCase());
    });
    if (result.length === 0) {
        console.log("No Notes Found!");
    }
    else {
        console.log("SEARCH RESULTS");
        result.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });
    }
}


async function editNote() {
    const files = fs.readdirSync("./notes");
    files.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });
    const title = await getInput("Enter Note Title to Edit: ");
    const filename = title + ".txt";
    if (!files.includes(filename)) {
        console.log("Note Not Found!");
        return;
    }
    const oldContent = fs.readFileSync("./notes/" + filename, "utf8");
    console.log("Old Content:", oldContent);
    const newContent = await getInput("Enter New Content: ");
    fs.writeFileSync("./notes/" + filename, newContent);
    console.log("Note Updated Successfully!");
}


async function deleteNote() {
    const files = fs.readdirSync("./notes");
    files.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });
    const title = await getInput("Enter Note Title to Delete: ");
    const filename = title + ".txt";
    if (!files.includes(filename)) {
        console.log("Note Not Found!");
        return;
    }
    fs.unlinkSync("./notes/" + filename);
    console.log("Note Deleted Successfully!");
}


notesApp();
