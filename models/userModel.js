const mongoose = require('mongoose')

//creating table for customers
const userSchema = new mongoose.Schema({
    username : {type:String}, 
    email :{type:String,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    profilepic:{
        type: String,
        default: null,
    },
    password:{type:String},
    userType:{
        type:String,
    },
    
   
   
})

//exporting customer from db
module.exports = mongoose.model('User',userSchema)