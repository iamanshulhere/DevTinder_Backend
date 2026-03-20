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

app.post("/signup",
    async (req, res) => {

        try{
            // validation of data
            validateSignUpData(req);

            // Encrypting Password
            const { firstName, lastName, email, password, dob} = req.body;
            const passwordHash = await bcrypt.hash(password, 10);

            const user = new User({
                firstName,
                lastName,
                email,
                password : passwordHash,
                dob
            });
            await user.save(); 
            res.send("User is Added!");
        }
        catch(err){
            res.status(400).send("Error : " + err.message);
        }
    }
);

// Login API

app.post("/login", async(req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email : email }); 

        if(!user){
            throw new Error("Invalid Credentials!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){

            // create a jwt token

            const token = await jwt.sign( { _id : user._id }, "MyBestBack!@#@#12", { expirersIn : "1d" });

            // Add the token 
            res.cookie("token" , token);
            res.send("Login Successful!");
        }
        else{
            throw new Error("Password is not Correct");
        }
    }
    catch (err){
        res.status(404).send("Error : " + err.message);
    }
});

app.get("/profile", userAuth, async(req, res) => {
    try{
        const user = req.user;
        res.send(user);
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


 