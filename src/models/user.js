const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
        minlength : 12
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;