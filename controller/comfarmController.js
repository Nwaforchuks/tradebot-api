const nodeMailer = require('nodemailer')
const userRegister = require('../model/userRegister.json');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

comfarmHandler = async (req,res)=>{
    let code = req.body.code
    if(!code){
        return res.status(401).json({"ok":false,"message":"Enter Email code"})
    }

  

     let match = userRegister.find(value=> value.code === code)
     let index = userRegister.findIndex(value=> value.code === code)



   
    if(match){
        let codes = String(code);
        const hashPwd = await bcrypt.hash(codes,10);
        match.password = hashPwd;
        match.code=0;

       
        userRegister.splice(index,1)
        

        userRegister.push(match);

        await fs.writeFile(
            path.join(__dirname,'..','model','userRegister.json'),
            JSON.stringify(userRegister)
           );

           res.status(200).json({"ok":true,"message":"password change success"})

    }else{
        res.status(401).json({"ok":false,"message":"please Enter correct code"})
    }
}

module.exports = comfarmHandler;