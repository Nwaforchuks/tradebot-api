const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const usersScheme = new Scheme({
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    name:{
        type:String,
        required : true
    },
    surname:{
        type:String,
        required : true
    },
    country:{
        type:String,
        required : true
    },
    state:{
        type:String,
        required : true
    },
    city:{
        type:String,
        required : true
    },
    address:{
        type:String,
        required : true
    },
    age:{
        type:String,
        required : true
    },
    refreshToken:{
        type:String
    },
    code:{
        type:String
    }


})

module.exports = mongoose.model('Users',usersScheme);