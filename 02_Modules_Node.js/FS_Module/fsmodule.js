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
// fs.appendFile("./FS_Module/mycv.txt","\n new data i am adding new line",(err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log("File Updated Successfully......");
// })

// DELETE THE FILE
const fs = require("fs");
fs.unlink("./FS_Module/sundari.txt",(err)=>{
    if(err){
        console.log("Failed to delete the file");
        return 
    }
    console.log("File Deleted Successfully");
})