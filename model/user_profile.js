const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const accountScheme = new Scheme({
    address:{
        type:String,
        required : true
    },
    amount:{
        type:Number,
        required : true
    },
    trade_amount:{
        type:String,
        required : true
    },
    last_transsaction:{
        type:String,
        required : true
    },
    tradeposition:{
        type:String,
        required : true
    },
    crypto:{
        type:String,
        required : true
    },
    id:{
        type:String,
        required : true
    }
})

module.exports = mongoose.model('Account',accountScheme);