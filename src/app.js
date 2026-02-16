const express = require("express");

const app = express();

app.get("/user", 
    (req, res, next) =>{
    console.log("Hello");
    res.send("MY My");
    next();
    },
    (req, res) => {
        console.log("Hello 2");
        
    }
)

app.post("/user", (req, res) =>{
    res.send("Data Successfully saved to Database");
})

app.delete("/user", (req, res) =>{
    res.send("Deleted Successfully!")
})


app.listen(3000, ()=>{
    console.log("Hello!");
})