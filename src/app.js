const express = require("express");

const app = express();

app.use(
    
)

app.get(
    "/admin/getAllData",
    (req, res) => {
        res.send("Admin get All Data!");
    }
)

app.get(
    "/admin/delete",
    (req, res) => {
        res.send("Delete All Data!");
    }
)


app.listen(3000, ()=>{
    console.log("Server Created!");
})