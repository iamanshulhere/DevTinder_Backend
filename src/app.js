const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup",
    async (req, res) => {
        const user = new User({
            firstName : "Ansh",
            email : "anshu0650@gmail.com",
            password : "ansh@123#"
        });
        await user.save();
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


