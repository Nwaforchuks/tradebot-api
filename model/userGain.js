const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const gainScheme = new Scheme({
    address:{
        type:String,
        required : true
    },
    id:{
        type:String,
        required : true
    },
    gain:[{
            time : String,
             gain:String,
        }]
    
})

module.exports = mongoose.model('Gain',gainScheme);