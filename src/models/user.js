const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 40
    },
    lastName : {
        type : String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error ("Invalid email address: " + value);
            }
        }
    },
    password : {
        type : String,  
        required  : true,
        minlength : 12
    },
    dob : {
        required : true,
        type : Number
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
        default : "https://imgs.search.brave.com/wYf16W5PU75wz2hTv4dNwQek6ZbDKoeHt7-qQcKR_VY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzlhLzBk/LzdkLzlhMGQ3ZDAw/NTdkYjBjNTRiMGM0/NDlhYmVkYTlmMTQ1/LmpwZw",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo Url : " + value);
            }
        }
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