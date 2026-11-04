// err is error
// encode is data

// READ THE FILE

// const fs = require("fs");
// fs.readFile("./FS_Module/demo.txt",(err,encode)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(encode.toString());
// })

// OR

// const fs = require("fs");
// fs.readFile("./FS_Module/demo.txt","utf8",(err,encode)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(encode);
// })

// WRITE THE FILE(IF THE FILE IS NOT EXIT IT WILL CREATE THE NEW FILE AND ADD THE TEXT)

// const fs = require("fs");
// fs.writeFile("./FS_Module/sundari.txt","Hii Sundari 😍",(err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log("Writing the file Successfully");
// })

// UPDATE THE FILE(IF THE FILE IS NOT EXIT IT WILL CREATE THE NEW FILE AND ADD THE TEXT)

// const fs = require("fs");
// fs.appendFile("./FS_Module/mycv.txt","Hello",(err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log("File Updated Successfully......");
// })

// DELETE THE FILE
// const fs = require("fs");
// fs.unlink("./FS_Module/sundari.txt",(err)=>{
//     if(err){
//         console.log("Failed to delete the file");
//         return
//     }
//     console.log("File Deleted Successfully");
// });


// RENAME THE FILE
// const fs = require("fs");
// fs.rename("./FS_Module/resume.txt", "./FS_Module/mycv.txt", (err) => {
//     if (err) {
//         console.log("Failed to rename the file");
//         return
//     }
//     console.log("File Renamed Successfully");
// });

// COPY THE FILE
// const fs = require("fs");
// fs.copyFile("./FS_Module/mycv.txt", "./FS_Module/copy.txt", (err) => {
//     if (err) {
//         console.log("Failed to copy:", err.message);
//         return;
//     }
//     console.log("Copied file successfully");
// });


// SYNCHRONOUS METHOD
// readFileSync execute line synchronously

// const fs = require("fs");
// console.log("Start");
// const data = fs.readFileSync("./FS_Module/copy.txt", "utf-8")
// console.log(data);
// console.log("End");

// const fs = require("fs");
// console.log("Start");
// const data = fs.writeFileSync("./FS_Module/copy.txt", "Hiii Everyone")
// console.log(data);
// console.log("End");

// const fs = require("fs");
// console.log("Start");
// const data = fs.appendFileSync("./FS_Module/copy.txt", "Hiiii guys......");
// console.log(data);
// console.log("End");

// const fs = require("fs");
// console.log("Start");
// const data = fs.unlinkSync("./FS_Module/copy.txt");
// console.log(data);
// console.log("End");

// const fs = require("fs");
// async function ReadFile(params) {
//     try{
//         const data = fs.readFile("./FS_Module/mycv.txt", "utf8")
//         console.log(data);
//     }
//     catch(error){
//         console.log(error);
//     }
// }
// ReadFile();

// const fs = require("fs");
// async function ReadFile(params) {
//     try{
//         const data = fs.writeFile("./FS_Module/mycv.txt", "utf8")
//         console.log(data);
//     }
//     catch(error){
//         console.log(error);
//     }
// }
// ReadFile();


// MAKE THE DIRECTORY
const fs = require("fs");
fs.mkdir("./Uploads", (err) => {
    if (err) {
        console.log("Failed to create a folder");
        return
    }
    console.log("Folder created successfully");
})