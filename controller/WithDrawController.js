const depo = require('../trade/make_deposit');
const accountDB = require('../model/user_profile.js');

const withDraw = depo();

const handleWithDraw = async (req,res)=>{
    const id  = req.body.id.id
    const address = req.body.address
    const amount = req.body.amount
    if(!id && !address && !amount){
        return res.status(401).json({"ok":false,"message":"Login please!!!"})
    }
    
    let  foundUser = await accountDB.findOne({id:id}).exec()



    

    if(!foundUser){
        return res.status(401).json({"ok":false,"message":"Login please!!!"})
    }

    if(foundUser.tradeposition  === "start"){
        return res.status(401).json({"ok":false,"message":"please stop trade first!!!"})
    }

    if(foundUser.amount === 0 ){
        return res.status(401).json({"ok":false,"message":"balance empty!!!"})
    }
    if(amount > foundUser.amount){

        return res.status(401).json({"ok":false,"message":"balance not upto Withdrawer amount!!!"})
    }

    let credit = await withDraw.withDraw(amount,address);

    if(credit.ok === false){
        return res.status(401).json({"ok":false,"message":`${credit.message} please withdraw with internal wallet address`})
    }


    foundUser.amount -= amount;
    foundUser.last_transsaction = credit.message;

    foundUser.save()

    res.status(200).json({
        "ok":true,
        "message":"success"
})
}

module.exports = handleWithDraw;