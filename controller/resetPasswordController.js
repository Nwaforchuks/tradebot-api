const userRegister = require('../model/userRegister.js');
const bcrypt = require('bcrypt');

const handleUserPasswordUpdate = async(req,res)=>{

    const id = req.body.id;
    const password = req.body.password;

    if(!id && !password){
       return  res.status(401).json({"ok":false,"message":"Update Failed"})
    }


    let foundUser = await userRegister.findOne({_id:id}).exec()
   // let index = userRegister.findIndex(values=>values.id === parseInt(id))


    if(!foundUser){
        return  res.status(401).json({"ok":false,"message":"Update Failed"})

    }

   try{

    const hashPwd = await bcrypt.hash(password,10);
    

    foundUser.password = hashPwd;


    foundUser.save()
    

    res.status(200).json({"ok":true,"message":"Update Success"})
   }catch(err){

   }


}

module.exports = handleUserPasswordUpdate;