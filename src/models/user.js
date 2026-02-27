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
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        lowercase : true,
        validate(value){
            if(!["male", "female"].includes(value)){
                throw new Error("Gender data is invalid!");
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://imgs.search.brave.com/wYf16W5PU75wz2hTv4dNwQek6ZbDKoeHt7-qQcKR_VY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzlhLzBk/LzdkLzlhMGQ3ZDAw/NTdkYjBjNTRiMGM0/NDlhYmVkYTlmMTQ1/LmpwZw"
    },
    about : {
        type : String,
        default : "Add about !"
    },
    skills : {
        type : [String]
    }
},
{
    timestamps : true
});

const User = mongoose.model("User", userSchema);

module.exports = User;