const user_profile = require('../model/user_profile.js');
const userRegister = require('../model/userRegister.js');
const usergain = require('../model/userGain.js')
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

const handleNewUser = async (req,res)=>{

    const name = req.body.name;
    const surname = req.body.surname;
    const country = req.body.country;
    const state = req.body.state;
    const city = req.body.city;
    const age = req.body.age;
    const password = req.body.password;
    const address = req.body.address;
    const email = req.body.email;

    // check if some register field is not filled
    if(!email && !password && !name && !surname && !country &&  !state && !city && !address && !age){
        return res.status(400).json({"ok":false,'message': 'Registeration not complete!!'})
    }


    

    //check for duplecate in register db

   let dupplicate1 = await userRegister.findOne({
        
            
                email:email
            
        
    }).exec()



     

   // let dupplicate1 = userRegister.find(users => email === users.email || address === users.address    )
    

    if(dupplicate1 ){
        return res.status(409).json({"ok":false,'message': 'User Already Register!!'});

    }

    

     // encrypt password
     try{

        const hashPwd = await bcrypt.hash(password,10);

        // create dbs





       await userRegister.create({
        'email':email,
        "password":hashPwd,
        "name":name,
        "surname":surname,
        "country":country,
        "state":state,
        "city":city,
        "address":address,
        "age":age,
        "refreshToken":"",
        "code":""

       })

       let find = await userRegister.findOne( {address:address});

       let id = find._id.toString();

        await user_profile.create({
        "address":address,
        "amount":0,
        "trade_amount":"0",
        "last_transsaction":0,
        "tradeposition":"stop",
        "crypto":"none",
        "id":id
       })

       const gain =await usergain.create({
        "address":address,
        "id":id,
        "gain":[
            {
                "time":"none",
                "gain":"none"
            }

        ]
       })


    //    userRegister.push(regidb)
    //    user_profile.push(userPro)
    //    usergain.push(gain);
    


    //    await fs.writeFile(
    //     path.join(__dirname,'..','model','userRegister.json'),
    //     JSON.stringify(userRegister)
    //    );

    //    await fs.writeFile(
    //     path.join(__dirname,'..','model','user_profile.json'),
    //     JSON.stringify(user_profile)
    // );

    // await fs.writeFile(
    //     path.join(__dirname,'..','model','userGain.json'),
    //     JSON.stringify(usergain)
    // );

    return res.status(201).json({'ok':true,'message':  `New User ${name}  ${surname} Created Success!!`});


    }catch(err){

        return res.status(500).json({'ok':false,'message':  err.message});
    }

}

module.exports = handleNewUser;