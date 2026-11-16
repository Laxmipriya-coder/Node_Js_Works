const path = require("path");

const filepath = "C:/Users/laxmi/OneDrive/Desktop/Node.js Qspider/04_JSONHandling/app.js"

// console.log(path.basename(filepath));
// console.log(path.dirname(filepath));
// console.log(path.extname(filepath));
// console.log(path.resolve(__dirname,"demo.js"));
console.log(__dirname);
console.log(__filename);
console.log(path.extname(__filename));

const folderpath = path.resolve(__dirname,"uploads")
console.log(folderpath);
