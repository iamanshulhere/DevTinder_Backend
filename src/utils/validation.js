const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not Valid!");
    }

    else if(!email || !validator.isEmail(email)){
        throw new Error("Email is not Valid!");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter Strong Password!");
    }
};

const validaiteEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));

    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validaiteEditProfileData,
};