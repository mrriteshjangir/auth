// models/Signup.js

const mongoose = require('mongoose');

const SignupSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        useremail: {
            type: String,
        },
        userpassword: {
            type: String,
        },
        photo: {
            type: String
        },
        added_on:{
            type: Date,
            default: Date.now
        }
    },
    {
        collection:'user',
    }
);
module.exports = Signup = mongoose.model('user', SignupSchema);