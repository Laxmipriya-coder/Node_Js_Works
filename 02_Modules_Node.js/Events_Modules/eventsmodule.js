const event = require("events");

const ev = new event()
ev.on("greet",()=>{
    console.log("Hello..... How are you");
})

ev.emit("greet")