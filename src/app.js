const express = require("express");
const connectDB = require("./config/database");
const app = express();

connectDB().then(() =>{
    console.log("Database connection established..");
    app.listen(3000, ()=>{
    console.log("Server Created!");
});
}).catch(err => {
    console.error("Databse cannot be connected");
}); 


