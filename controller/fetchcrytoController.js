const { getCryptoRate } = require('crypto-exchange-rates');
const handlecrypto = async (req,res)=>{
    try{
        let btc = await getCryptoRate('BTCUSDT')

        let eth = await getCryptoRate('ETHUSDT')

        let crypto = {
            btc,eth
        }
        return res.status(201).json({"ok":true,"message":"success","crypto":crypto})
    }catch(err){
        return res.status(401).json({"ok":false,"message":err})
    }


   


}

module.exports = handlecrypto;