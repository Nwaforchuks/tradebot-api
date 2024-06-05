const userRegister = require('../model/userRegister.js');

const handleUserAddress = async(req,res)=>{
    const id = req.body.id.id;
    const address = req.body.address;


    if(!id && !address){
       return  res.status(401).json({"ok":false,"message":"Update Failed"})
    }


    let foundUser = await userRegister.findOne({_id:id}).exec();

    if(!foundUser){
        return  res.status(401).json({"ok":false,"message":"Update Failed"})

    }

   
    foundUser.address = address;


    foundUser.save();
    
    // userRegister.splice(index,1)

    
   

    
    // userRegister.push(foundUser);


    // await fs.writeFile(
    //     path.join(__dirname,'..','model','userRegister.json'),
    //     JSON.stringify(userRegister)
    //    );

       res.status(200).json({"ok":true,"message":"Update Success"})

}



module.exports = handleUserAddress;