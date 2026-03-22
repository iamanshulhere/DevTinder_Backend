const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");


authRouter.post("/signup",
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

authRouter.post("/login", async(req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email : email }); 

        if(!user){
            throw new Error("Invalid Credentials!");
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            // create a jwt token

            const token = await user.getJWT();

            // Add the token to cookie 
            res.cookie("token" , token, { expires : new Date(Date.now() + 8 * 3600000) });
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

authRouter.post("/logout", async(req, res) => {
    res.cookie("token", null, {
        expires : new Date(Date.now()),
    });
    res.send("logout Successful!");
});

module.exports = authRouter;
