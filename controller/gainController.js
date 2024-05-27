let users_gain = require('../model/userGain.js')

let handlegain = async (req,res)=>{
    const id = req.query.id.id;

    if(!id){
        return res.status(401).json({"ok":false,"message":"failed to get user gain"})
    }

    let gain = await users_gain.findOne({id:id}).exec()

    if(!gain){
        return res.status(401).json({"ok":false,"message":"failed to get user gain"})
    }

    return res.status(200).json({"ok":true,"message":"success","gain":gain.gain})

}

module.exports = handlegain;