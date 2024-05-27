const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const lastdepo = new Scheme({

    id:{
        type:String,
        default : "1"
    },
    
    transactTime:{
        type:String,
        default : "2001-08-13T16:18:21.185Z"
    }
})

module.exports = mongoose.model('lastdepo',lastdepo);

