const fs = require('fs').promises;
const path = require('path');
const data = {
    users_pro : require('../model/user_profile.js'),
    users_info : require('../model/userRegister.js'),
    users_gain: require('../model/userGain.js')
}

const deleteAllUser = async (req,res)=>{
    const id = req.body.id;
 
    if(!id){
        return res.status(401).json({"ok":false,"message":"Deleting User 2Failed!!!"})
    }

    let user_gain = await data.users_gain.findOne({id:id}).exec()
    let user_info = await data.users_info.findOne({_id:id}).exec()
    let user_pro = await data.users_pro.findOne({id:id}).exec()

   if(!user_info){

    return res.status(401).json({"ok":false,"message":"Deleting User Failed!!!"})
   }

  await user_gain.deleteOne()
  await user_info.deleteOne()
  await  user_pro.deleteOne()

  

   return res.status(200).json({"ok":true,"message":"Deleting users Done!!!"})
}

module.exports = deleteAllUser;