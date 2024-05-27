const nodeMailer = require('nodemailer')
const userRegister = require('../model/userRegister.json');
const fs = require('fs').promises;
const path = require('path');

forgetHandler = async (req,res)=>{
    let email = req.body.email
    if(!email){
        return res.status(401).json({"ok":false,"message":"Enter Email"})
    }

    let match = userRegister.find(value=> value.email === email)
    let index = userRegister.findIndex(value=> value.email === email)
   
    if(match){
        let smtpTransport = nodeMailer.createTransport({
            service:'gmail',
            auth:{
                user:"chukwuman03@gmail.com",
                pass:"ttdejkrloavyoyiv"
            }

        });

        let rand = Math.floor((Math.random()*10000)+10000);

        let mailOption = {
            to:email,
            from:"chukwuman03@gmail.com",
            subject:"Please confirm your Email Account",
            text:`${rand}`
        }

        match.code = Number(rand);
        if(index >-1){
            userRegister.splice(index,1);
        }

        userRegister.push(match);
        await fs.writeFile(
            path.join(__dirname,'..','model','userRegister.json'),
            JSON.stringify(userRegister)
           );
    

        smtpTransport.sendMail(mailOption,function(err){
            if(err){
               return res.status(401).json({"ok":false,"message":`${err.message}`})
            }else{
                return res.status(200).json({"ok":true,"message":"code sent to your email"})
            }
        })
    }else{
        return res.status(401).json({"ok":false,"message":"User not registerd"})
    }
}

module.exports = forgetHandler;