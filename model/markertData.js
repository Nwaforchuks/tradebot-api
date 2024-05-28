const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const markertdata = new Scheme({

    ethBuy:{

        type:Number,
        default : 0
    },

    ethSell:{

        type:Number,
        default : 0
    },

    btcBuy:{

        type:Number,
        default : 0
    },

    btcSell:{

        type:Number,
        default : 0
    },

    ethOnBuy:{

        type:Boolean,
        default : false
    },

    btcOnBuy:{

        type:Boolean,
        default : false
    },

    

    id:{
        type:String,
        default : "1"
    },
})

module.exports = mongoose.model('Markertdata',markertdata);

