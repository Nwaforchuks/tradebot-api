const userRegister = require('../model/user_profile.js');
const marketData = require('../model/markertData.json');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleUseraccount = async (req,res)=>{
    const id  = req.query.token.id
    if(!id){
        return res.status(401).json({"ok":false,"message":"No user id!!!"})
    }
    
    let  foundUser = await userRegister.findOne({id:id}).exec()



    

    if(!foundUser){
        return res.status(401).json({"ok":false,"message":"user not found!!!"})
    }

    res.status(200).json({
        "ok":true,
        "message":"success",
        'amount':foundUser.amount,
        "trade_amount":foundUser.trade_amount,
        "tradeposition":foundUser.tradeposition,
        "crypto":foundUser.crypto,
        "last_transsaction":foundUser.last_transsaction,
        "id":foundUser.id

})
}

const handleUserAccountUpdate = async(req,res)=>{

    const tradeposition = req.body.tradeposition;
    const crypto = req.body.crypto;
    const id = req.body.id.id;
    const trade_amount = req.body.trade_amount;


    if(!id ||!tradeposition||!crypto || !trade_amount){
       return  res.status(401).json({"ok":false,"message":"Update Failed"})
    }


    let foundUser = await userRegister.findOne({id:id}).exec()
   // let index = userRegister.findIndex(values=>values.id === parseInt(id))


    if(!foundUser){
        return  res.status(401).json({"ok":false,"message":"Update Failed"})

    }

    if(marketData.btcOnBuy === true) {

       if (foundUser.crypto.toLowerCase()==="btc"){
            return res.status(401).json({"ok":false,"message": "Wait for an hour we just bought BTC!!"})

        }



    }

    if(marketData.ethOnBuy === true){

        if(foundUser.crypto.toLowerCase()==="eth"){

            return res.status(401).json({"ok":false,"message": "Wait for an hour we just bought ETH!!"})

        }


    }

    

    

    if(foundUser.tradeposition.toLowerCase()==="start" && parseFloat(foundUser.trade_amount) <= 0.0){

        return res.status(401).json({"ok":false,"message": "please set investment percent before continue!!!"})

    }

    if(foundUser.amount <= 0.0){
        return res.status(401).json({"ok":false,"message": "Account balance Empty!!!"})
    }

    foundUser.tradeposition=tradeposition;
    foundUser.crypto=crypto;
    foundUser.trade_amount=trade_amount;


    foundUser.save()
    

       res.status(200).json({"ok":true,"message":"Update Success"})

}

module.exports = {handleUseraccount,handleUserAccountUpdate}