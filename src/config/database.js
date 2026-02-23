const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://db_user:GukiTheWorld1234@hello.wd2sx6g.mongodb.net/devtinder"
    );
};

module.exports = connectDB;
