var ccxt = require('ccxt')
const handlecrypto = async (req,res)=>{
    try{
      const oneTrading = new ccxt.bitmex({});
      let btc = '';
      let eth = '';


      let btcCandle = undefined;
      let ethCanndle = undefined;

      ethCanndle = await oneTrading.fetchOHLCV("ETH/USDT", '5m',undefined,1);
      btcCandle = await oneTrading.fetchOHLCV("BTC/USDT", '5m',undefined,1);
        
      let btc1 = btcCandle[0];
      btc = btc1[3];

      let eth1 = ethCanndle[0]
       eth = eth1[3]
      let crypto = {
        btc,eth
      }
      return res.status(201).json({"ok":true,"message":"success","crypto":crypto})
   
    }
       catch(err){
            return res.status(401).json({"ok":false,"message":err})
        }
   

   


}

module.exports = handlecrypto;