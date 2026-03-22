const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const validator = require('validator')
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

// middle ware
app.use(express.json());
app.use(cookieParser());

app.get("/profile", userAuth, async(req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }
    catch (err){
        res.status(400).send("Error : " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async(req, res) => {
    try{
        res.send("Conection Stablished!");
    }
    catch (err){
        res.status(400).send("Error : " + err.message);
    }
});



connectDB().then(() =>{
    console.log("Database connection established.."); 
    app.listen(3000, ()=>{
    console.log("Server Created!");
});
}).catch(err => {
    console.error("Databse cannot be connected");
}); 


 