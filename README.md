Node.js Learning Journey 🚀
This repository contains my Node.js learning notes, concepts, and practice programs. I am learning Node.js step by step and adding the topics I study.
📚 Topics Covered
1. Introduction to Node.js
- What is Node.js?
- Why Node.js is used
- JavaScript runtime environment
- Node.js basics
2. History of Node.js
- Introduction and origin of Node.js
- How Node.js evolved
- Basic understanding of its development
3. Node.js Modules
Modules help organize code into reusable pieces.

Types of modules:
- Core Modules: Built-in modules provided by Node.js
- Custom Modules: Modules created by developers
- Third-Party Modules: Modules installed using npm
4. Custom Modules
Practiced creating and using custom modules.

Concepts:
- require()
- module.exports
- Exporting functions
- Importing functions from another file
Example:
// FileB.js
function multiply(a, b) {
    return a * b;
}

module.exports = { multiply };
// custom_module.js
const { multiply } = require("./FileB");

console.log(multiply(10, 20));
5. Core Modules — Currently Learning
Core modules are built-in modules provided by Node.js. They can be used without installing additional packages.

Currently learning the File System (fs) module.
File System (fs) Module
The fs module is used to work with files and directories.

Topics and methods being practiced:
- readFile() — read file content
- writeFile() — create or write to a file
- appendFile() — add content to a file
- mkdir() — create a directory
- readdir() — read directory contents
- unlink() — delete a file
- Synchronous and asynchronous file operations
Example:
const fs = require("fs");

fs.writeFile("demo.txt", "Hello Node.js", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("File created successfully");
    }
});
🛠️ Tools Used
- Node.js
- npm
- Visual Studio Code
- Git and GitHub
📂 Repository Structure
Node.js Qspider/
├── 01_Basics/
├── 02_Modules_Node.js/
│   ├── Custom_Modules/
│   └── Core_Modules/
│       └── fs/
└── README.md
The folder structure may change as I continue learning.
🎯 Learning Goal
To build a strong foundation in Node.js, understand its core concepts, and continue learning backend development for MERN stack applications.
📈 Progress
- [x] Node.js basics
- [x] History of Node.js
- [x] Types of modules
- [x] Custom modules
- [ ] Core modules
- [ ] File System (fs) module — in progress
      
This repository is part of my continuous learning and hands-on practice with Node.js.
