const userRegister = require('../model/userRegister.js');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleUserprofile = async (req,res)=>{
    const id = req.query.token.id
    if(!id){
        return res.status(401).json({"ok":false,"message":"Login please!!!"})
    }
  
    // let  foundUser = await userRegister.findOne({_id: req.body.id}).exec()
     let  foundUser = await userRegister.findOne({_id:id}).exec();
  

    if(!foundUser){
        return res.status(401).json({"ok":false,"message":"Login please!!!"})
    }
   

    res.status(200).json({
        "ok":true,
        "message":"success",
        'email':foundUser.email,
        "name":foundUser.name,
        "surname":foundUser.surname,
        "country":foundUser.country,
        "state":foundUser.state,
        "city":foundUser.city,
        "address":foundUser.address,
        "age":foundUser.age,
        "varify":foundUser.varify,
        "id":foundUser._id

})
}


const handleUserprofileUpdate = async(req,res)=>{

    const name = req.body.name;
    const surname = req.body.surname;
    const country = req.body.country;
    const state = req.body.state;
    const city = req.body.city;
    const age = req.body.age;
    const id = req.body.id.id;

    if(!id ||!name||!surname||!country||!state||!city||!age){
       return  res.status(401).json({"ok":false,"message":"Update Failed"})
    }


    let foundUser = await userRegister.findOne({_id:id}).exec();

    if(!foundUser){
        return  res.status(401).json({"ok":false,"message":"Update Failed"})

    }

    foundUser.name = name;
    foundUser.surname= surname;
    foundUser.country=country;
    foundUser.state=state;
    foundUser.city=city;
    foundUser.age = age;


    foundUser.save();
    
    // userRegister.splice(index,1)

    
   

    
    // userRegister.push(foundUser);


    // await fs.writeFile(
    //     path.join(__dirname,'..','model','userRegister.json'),
    //     JSON.stringify(userRegister)
    //    );

       res.status(200).json({"ok":true,"message":"Update Success"})

}



module.exports = {handleUserprofile,handleUserprofileUpdate}