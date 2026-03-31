const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        index : true,  
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
        minlength : 12,
        validate(value) {
            if (!validator.isStrongPassword(value, {
                minLength : 10,
                minUppercase : 1,
                minLowercase : 1,
                minNumbers : 1,
                minSymbols : 1
            })) {
                throw new Error ("Enter the strong Password: " + value);
            }
        }
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
            if(value && !validator.isURL(value)){
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

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign( { _id : user._id }, "MyBestBack!@#@#12", { expirersIn : "7d" });

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;