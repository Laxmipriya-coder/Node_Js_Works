
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Get Input
function getInput(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

// Main Menu
async function contactManagement() {

    const option = await getInput(`Contact Management\n1. Add Contact\n2. Display All Contacts\n3. Search Contact\n4. Update Contact\n5. Delete Contact\n6. Exit\nEnter your option: `);

    switch (option) {

        case "1":
            await addContact();
            contactManagement();
            return;

        case "2":
            displayContacts();
            contactManagement();
            return;

        case "3":
            await searchContact();
            contactManagement();
            return;

        case "4":
            await updateContact();
            contactManagement();
            return;

        case "5":
            await deleteContact();
            contactManagement();
            return;

        case "6":
            console.log("Thank you😊");
            rl.close();
            return;

        default:
            console.log("Invalid Option😏🥱");
            contactManagement();
            return;
    }
}

// Add Contact
async function addContact() {

    const name = await getInput("Enter Name: ");
    const phone = await getInput("Enter Phone: ");
    const email = await getInput("Enter Email: ");

    let contacts = JSON.parse(
        fs.readFileSync("./data/contacts.json", "utf8")
    );

    contacts.push({
        id: contacts.length + 1,
        name: name,
        phone: phone,
        email: email
    });

    fs.writeFileSync(
        "./data/contacts.json",
        JSON.stringify(contacts, null, 2)
    );

    console.log("Contact Added Successfully!");
}

// Display All Contacts
function displayContacts() {

    let contacts = JSON.parse(
        fs.readFileSync("./data/contacts.json", "utf8")
    );

    if (contacts.length === 0) {
        console.log("No Contacts Found!");
        return;
    }

    console.log("\n===== ALL CONTACTS =====");

    contacts.forEach((contact) => {

        console.log("ID:", contact.id);
        console.log("Name:", contact.name);
        console.log("Phone:", contact.phone);
        console.log("Email:", contact.email);
        console.log("----------------------");

    });
}

// Search Contact
async function searchContact() {

    let contacts = JSON.parse(
        fs.readFileSync("./data/contacts.json", "utf8")
    );

    const name = await getInput("Enter Contact Name to Search: ");

    let result = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(name.toLowerCase());
    });

    if (result.length === 0) {
        console.log("Contact Not Found!");
    }
    else {
        console.log("\n===== SEARCH RESULTS =====");

        result.forEach((contact) => {
            console.log("ID:", contact.id);
            console.log("Name:", contact.name);
            console.log("Phone:", contact.phone);
            console.log("Email:", contact.email);
        });
    }
}

// Update Contact
async function updateContact() {

    let contacts = JSON.parse(
        fs.readFileSync("./data/contacts.json", "utf8")
    );

    if (contacts.length === 0) {
        console.log("No Contacts Found!");
        return;
    }

    displayContacts();

    const id = await getInput("Enter Contact ID to Update: ");

    let contact = contacts.find((contact) => {
        return contact.id === Number(id);
    });

    if (!contact) {
        console.log("Contact Not Found!");
        return;
    }

    const name = await getInput("Enter New Name: ");
    const phone = await getInput("Enter New Phone: ");
    const email = await getInput("Enter New Email: ");

    contact.name = name;
    contact.phone = phone;
    contact.email = email;

    fs.writeFileSync(
        "./data/contacts.json",
        JSON.stringify(contacts, null, 2)
    );

    console.log("Contact Updated Successfully!");
}

// Delete Contact
async function deleteContact() {

    let contacts = JSON.parse(
        fs.readFileSync("./data/contacts.json", "utf8")
    );

    if (contacts.length === 0) {
        console.log("No Contacts Found!");
        return;
    }

    displayContacts();

    const id = await getInput("Enter Contact ID to Delete: ");

    let result = contacts.filter((contact) => {
        return contact.id !== Number(id);
    });

    if (result.length === contacts.length) {
        console.log("Contact Not Found!");
        return;
    }

    fs.writeFileSync(
        "./data/contacts.json",
        JSON.stringify(result, null, 2)
    );

    console.log("Contact Deleted Successfully!");
}

// Start Application
contactManagement();
