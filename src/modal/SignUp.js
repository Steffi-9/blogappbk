const mongoose = require('mongoose');

let mongooseSchema = mongoose.Schema;
const signUpSchema = new mongooseSchema({
    username:String,
    email:String,
    password:String,
    
});

var signUpModelObj = mongoose.model("SignUps",signUpSchema);
module.exports = {signUpModelObj};