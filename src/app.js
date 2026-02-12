const express = require("express");

const app = express();


app.use("/home", (req, res) =>{
    res.send("Hello from Home!");
})

app.use("/about", (req, res) =>{
    res.send("My about Section");
})

app.use("/dashboard", (req, res) =>{
    res.send("My Dashboard!");
})


app.use("/maggie", (req, res) =>{
    res.send("My Maggie!");
})

app.use("/alireza", (req, res) =>{
    res.send("My Alireza!");
})

app.use("/guki", (req, res) =>{
    res.send("My Guki!");
})

app.use("/hikaru", (req, res) =>{
    res.send("My Hikaru!");
})

app.use((req, res) =>{
    res.send("Hello from the server!");
})  



app.listen(3000, ()=>{
    console.log("Hello!");
})