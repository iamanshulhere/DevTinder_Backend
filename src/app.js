const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup",
    async (req, res) => {
        const user = new User({
            firstName : "OP",
            email : "opPrakash@gmail.com",
            password : "Omish@123#"
        });

        try{
            await user.save();
            res.send("User is Added!");
        }
        catch(err){
            res.status(400).send("Error saving the user : " + err.message);
        }
    }
);


connectDB().then(() =>{
    console.log("Database connection established..");
    app.listen(3000, ()=>{
    console.log("Server Created!");
});
}).catch(err => {
    console.error("Databse cannot be connected");
}); 


 