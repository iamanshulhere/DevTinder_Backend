const express = require("express");

const app = express();

app.get("/user", (req, res) =>{
    res.send({first : "Ansh", second : "Kashyap"});
})

app.post("/user", (req, res) =>{
    res.send("Data Successfully saved to Database");
})

app.delete("/user", (req, res) =>{
    res.send("Deleted Successfully!")
})


app.listen(3000, ()=>{
    console.log("Hello!");
})