const { getCryptoPrices } = require("crypto-price-fetcher");
const handlecrypto = async (req,res)=>{
    try{
        const symbols = ['BTCUSDT', 'ETHUSDT'];
        let btc = ''
        let eth = ''
        // Call the function to get cryptocurrency prices
       
        
        let price = await  getCryptoPrices(symbols);

         Object.entries(price).forEach(([symbol, data]) => {
            
              if(symbol === "BTCUSDT"){
                btc = `${data.lastPrice}`;

              }else if (symbol === "ETHUSDT"){
                eth = `${data.lastPrice}`;

              }
             
             
            })

       

        let crypto = {
            btc,eth
        }
        return res.status(201).json({"ok":true,"message":"success","crypto":crypto})
    }catch(err){
        return res.status(401).json({"ok":false,"message":err})
    }


   


}

module.exports = handlecrypto;