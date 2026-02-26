const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// middle ware
app.use(express.json());

app.post("/signup",
    async (req, res) => {
  
        const user = new User(req.body);

        try{
            await user.save();
            res.send("User is Added!");
        }
        catch(err){
            res.status(400).send("Error saving the user : " + err.message);
        }
    }
);

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

app.patch("/user", async(req, res) => {

    const userId = req.body.userId;
    const data = req.body;
    try{
        await User.findByIdAndUpdate(userId, data);
        res.send("user update successfully!")
    }
    catch (err){
        res.status(404).send("Something Wrong");
    }
})  

connectDB().then(() =>{
    console.log("Database connection established.."); 
    app.listen(3000, ()=>{
    console.log("Server Created!");
});
}).catch(err => {
    console.error("Databse cannot be connected");
}); 


 