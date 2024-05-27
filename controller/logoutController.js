const resgisterUser = require('../model/userRegister.json');

const fs = require('fs').promises;
const path = require('path');

const handleLogout = async (req,res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt){
        return res.status(401).json({"ok":true, "message": "No Content!!"})
    }

    const refreshToken = cookies.jwt;


    const foundUser = resgisterUser.find(value=> value.refreshToken === refreshToken);
    const index = resgisterUser.findIndex(value=> value.refreshToken === refreshToken);
    if(!foundUser){
        res.clearCookie('jwt');
        return res.status(201).json({"ok":true,"message":"Logout Success!!"})
    }

    foundUser.refreshToken = '';

    if(index >-1){
        resgisterUser.splice(index,1);
    }

    resgisterUser.push(foundUser)
    await fs.writeFile(
        path.join(__dirname,'..','model','userRegister.json'),
        JSON.stringify(resgisterUser)
       );

       res.clearCookie('jwt');

       return  res.status(201).json({"ok":true,"message":"Logout Success!!"})
}

module.exports = handleLogout;