const registerUsers = require('../model/userRegister.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');


const loginHandle = async (req, res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({"message":"Email and Password is rqquired!!"});
    }

    const foundUser = await registerUsers.findOne({email:email}).exec();


    // let user_Info1 = registerUsers.find(value => foundUser.address === value.address )
    // let index = registerUsers.findIndex(user => user.email === email);

  

    
    if(!foundUser){

        return res.status(401).json({"ok":false,"message":"Unauthorized User"})
    }

    const match = await bcrypt.compare(password,foundUser.password);

    if(match){
        const accessToken = jwt.sign(
            {
                "UserInfo":{
                    "username":foundUser.email
                }
            },
            process.env.accessToken,
            {expiresIn : '30s'}
        );

        const refreshToken = jwt.sign(
            {
                "UserInfo":{
                    "username":foundUser.email
                }
            },
            process.env.refreshToken,
            {expiresIn : '1d'}
        );

        foundUser.refreshToken = refreshToken;
        foundUser.save();

        
        //     registerUsers.splice(index,1)
        

        // registerUsers.push(foundUser);

        // await fs.writeFile(
        //     path.join(__dirname,'..','model','userRegister.json'),
        //     JSON.stringify(registerUsers)
        //    );

          // res.cookie("jwt",refreshToken,{ httpOnly: true, secure: true ,sameSite:'None',maxAge:24*60*60*1000 });

           res.status(200).json({"ok":true,"message": "Login Success","id":foundUser._id,"token":refreshToken})
    }else{
        res.status(401).json({"ok":false,"message": "Password mismatch"})
    }
}

module.exports = loginHandle;