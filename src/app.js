const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const validator = require('validator')
const bcrypt = require("bcrypt");
const coikeParser = require("cookie-parser");

// middle ware
app.use(express.json());
app.use(coikeParser());

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

        if(!email || !validator.isEmail(email)){
            throw new Error("Email is not valid!")
        }

        if (!password) {
            throw new Error("Password is required!");
        }

        const user = await User.findOne({ email : email }); 

        if(!user){
            throw new Error("Invalid Credentials!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            res.cookie("token" , "abdfhbndvcbadfjnsajkdfbvabsjbdsjkndfcuabjfefkbhabdcjbdsfjvmanjfbhdabvnjdnvabhdbfhbfvbndvc");
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

app.get("/profile", async(req, res) => {
    const cookies = req.cookies;

    const { token } = cookies;
    // Validate my token



    console.log(cookies);
    res.send("Reading Cookies!");
})

// get user by email

app.get("/user", async (req, res) => {
    const userEmail = req.body.email; 

    try{
        const user = await User.find({email : userEmail});
        res.send(user);
    }
    catch (err) {
        res.status(400).send("Something Wrong");
    }
});

// getting all user

app.get("/feed", async (req, res) => {

    try{
        const user = await User.find({});
        res.send(user);
    }

    catch (err) {
        res.status(404).send("Something Wrong");
    }
});


// delete the user
app.delete("/user", async(req, res) => {
    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully!");
    }

    catch (err) {
        res.status(404).send("Something Wrong");
    }
})

// upadate data of the user

app.patch("/user/:userId", async(req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = ["photoUrl", "about", "firstName", "skills"];

        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );

        if(!isUpdateAllowed){
            throw new Error ("Update is not Allowed!");
        }

        if(data?.skills.length > 10){
            throw new Error ("more than 10 skills are not allowed!");
        }

        await User.findByIdAndUpdate(userId, data,{ runValidators : true});
        res.send("User Upadate Successfully!");
    }
    catch (err){
        res.status(404).send(err.message);
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


 