const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://db_user:GukiTheWorld1234@hello.wd2sx6g.mongodb.net/"
    );
};

connectDB().then(() =>{
    console.log("Database connection established..");
}).catch(err => {
    console.error("Databse cannot be connected");
})