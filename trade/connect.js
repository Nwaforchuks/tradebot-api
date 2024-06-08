var ccxt = require('ccxt')
const deopist = require('./make_deposit')
const hasHeadAndShoulder = require('slz-indicators/dist/index').hasHeadAndShoulder;
const hasInverseHeadAndShoulder = require('slz-indicators/dist/index').hasInverseHeadAndShoulder;
const shedule = require('node-schedule')

const fs = require('fs').promises;
const path = require('path');
var buy1 = 0;
var sell1 = 0;

const connect_Markert = ()=>{ 

return {

   since : undefined,
   limit : 400,

   getCrypoPrice : async function(symbol, old_volume){

      const oneTrading = new ccxt.bitmex({});



      let markets = undefined;

      try{
         markets = await oneTrading.fetchMarkets({})
      }catch(err){
         console.log(err)
      }
      let volume = 0;

      if(markets != undefined){

          markets.forEach(value=>{
         if(value.symbol.toUpperCase() === symbol ){

            //console.log(value.limits.amount.max)
           // console.log(value.limits.amount.min)
           //console.log(value.info.markPrice)
 
           console.log(old_volume * Number(value.info.markPrice))

           let amount = Number(value.info.markPrice) * old_volume ;
           
           volume = amount;
           

           
         }
      })

      }

     

      return volume;

   },


  getVolume : async function(symbol , price){


      //this function go retun the volume of crypto make we want buy base on the price make we price
      const oneTrading = new ccxt.bitmex({});

      let markets = undefined;
      try{
         markets = await oneTrading.fetchMarkets({})
      }catch(err){
         console.log(err)
      }
      let volume = 0;

      if(markets!= undefined){
             markets.forEach(value=>{
         if(value.symbol.toUpperCase() === symbol ){

            //console.log(value.limits.amount.max)
           // console.log(value.limits.amount.min)
           //console.log(value.info.markPrice)
 
           console.log(price / Number(value.info.markPrice))

           let amount = price / Number(value.info.markPrice);
           
           volume = amount;
           

           
         }
      })

      }
  

      return volume;


   },
   sell : async function(value = []){

      if (value.length >= 299 ){

        //const output = new input(value);
         let option =  await hasHeadAndShoulder(input = {values : value,period : 14});
       return option
      }else {
         return false
      }
    
   },

   buy : async function(value = []){
      if (value.length >= 299 ){

         //const output = new input(value);
          let option =  await hasInverseHeadAndShoulder(input = {values : value,period : 14});
        return option
       }else {
          return false
       }
   },


   connect_btc : async function(){

         console.log("inside btc trade!!");
         const oneTrading = new ccxt.bitmex({});

        


     let btcCandle = undefined;
     try{
      btcCandle = await oneTrading.fetchOHLCV("BTC/USDT", '5m',this.since,this.limit);
     }catch(err){
      console.log(err)
     }


        let close = []

       if (btcCandle != undefined){
            btcCandle.forEach(value=>{
           close.push(value[3])

         })

        }
   
  

   // for (var i = 0; i < 400 ; i++){
   //    close.push(Math.floor(Math.random()*999)+1)
   // }

     

      const depo = deopist();
      const mark = connect_Markert();
      console.log(await depo.check_trade_amount("btc"))
      if (await this.buy(close)){

        
         if(await depo.check_trade_amount("btc") <= depo.getBalance() && await depo.check_trade_amount("btc") > 0){

            let areadyBuy1 = require('../model/markertData.js')

            let areadyBuy = await areadyBuy1.findOne({id:"1"}).exec()

         if(areadyBuy.btcOnBuy == false){

           /// we go put current cryto price here
            areadyBuy.btcOnBuy = true;
            areadyBuy.btcBuy = await depo.check_trade_amount("btc");
            areadyBuy.btcSell = await mark.getVolume("BTC/USDT",await depo.check_trade_amount("btc"))
            depo.orderCrypto("BTC/USDT",'buy',await mark.getVolume("BTC/USDT",await depo.check_trade_amount("btc")),await depo.check_trade_amount("btc"));
           
            console.log("we are buying btc")
             areadyBuy.save();

         //    await fs.writeFile(
         //       path.join(__dirname,'..','model','markertData.json'),
         //       JSON.stringify(areadyBuy)
         //   );

         }else{

            console.log("we are sellinging btc")

           /// we go put current cryto price here
            areadyBuy.btcOnBuy = false;
            await depo.orderCrypto("BTC/USDT",'sell',areadyBuy.btcSell,await mark.getCrypoPrice("BTC/USDT",areadyBuy.btcSell));
            await depo.payPercent(depo.clientGain(areadyBuy.btcBuy,await mark.getCrypoPrice("BTC/USDT",areadyBuy.btcSell)),"btc");
           // na here we pay client thier gain
            
         //    await fs.writeFile(
         //       path.join(__dirname,'..','model','markertData.json'),
         //       JSON.stringify(areadyBuy)
         //   );

          areadyBuy.save();
         }
 
         }

         

      
      


      }else if(await this.sell(close)){
         let areadyBuy1 = require('../model/markertData.js')
         let areadyBuy = await areadyBuy1.findOne({id:"1"}).exec();
         console.log("we are selling btc")

         if(areadyBuy.btcOnBuy == true){
            console.log("we are selling btc with volume")
            /// we go put current cryto price here
            areadyBuy.btcOnBuy = false;
            await depo.orderCrypto("BTC/USDT",'sell',areadyBuy.btcSell,await mark.getCrypoPrice("BTC/USDT",areadyBuy.btcSell));
            await depo.payPercent(depo.clientGain(areadyBuy.btcBuy,await mark.getCrypoPrice("BTC/USDT",areadyBuy.btcSell)),"btc");
   
         //    await fs.writeFile(
         //       path.join(__dirname,'..','model','markertData.json'),
         //       JSON.stringify(areadyBuy)
         //   );

          areadyBuy.save();
         }


      }

        
      

   //ETH/USDT
   //BTC/USDT

   },

   connect_eth : async function(){

      const mark = connect_Markert();

       console.log("inside eth trade!!");
      const oneTrading = new ccxt.bitmex({});

   let btcCandle = undefined;

   try{
      btcCandle = await oneTrading.fetchOHLCV("ETH/USDT", '5m',this.since,this.limit);
   }catch(err){
      console.log(err)
   }

    let close = []

    if(btcCandle != undefined){
       btcCandle.forEach(value=>{
       close.push(value[3])

      })

    }





// for (var i = 0; i < 400 ; i++){
//    close.push(Math.floor(Math.random()*999)+1)
// }

const depo = deopist();
console.log(await depo.check_trade_amount("eth"))

      if (await this.buy(close)){

         
         if(await depo.check_trade_amount("eth") <= depo.getBalance() && await depo.check_trade_amount("eth") > 0){

            let areadyBuy1 = require('../model/markertData.js')
            let areadyBuy = areadyBuy1.findOne({id:"1"}).exec()

         if(areadyBuy.ethOnBuy == false){

           /// we go put current cryto price here
            areadyBuy.ethOnBuy = true;
            areadyBuy.ethBuy = await depo.check_trade_amount("eth");
            areadyBuy.ethSell = await mark.getVolume("ETH/USDT",await depo.check_trade_amount("eth"))
            depo.orderCrypto("ETH/USDT",'buy',await mark.getVolume("ETH/USDT",await depo.check_trade_amount("eth")),await depo.check_trade_amount("eth"));
           
            console.log("we are buying eth")

         //    await fs.writeFile(
         //       path.join(__dirname,'..','model','markertData.json'),
         //       JSON.stringify(areadyBuy)
         //   );

            areadyBuy.save();

         }else{

            console.log("we are sellinging eth")

           /// we go put current cryto price here
            areadyBuy.ethOnBuy = false;
            await depo.orderCrypto("ETH/USDT",'sell',areadyBuy.ethSell,await mark.getCrypoPrice("ETH/USDT",areadyBuy.ethSell));
            await depo.payPercent(depo.clientGain(areadyBuy.ethBuy,await mark.getCrypoPrice("ETH/USDT",areadyBuy.ethSell)),"eth");
         //    await fs.writeFile(
         //       path.join(__dirname,'..','model','markertData.json'),
         //       JSON.stringify(areadyBuy)
         //   );

         areadyBuy.save();
         }
 
         }

         

      
      


        }else if(await this.sell(close)){
         let areadyBuy1 = require('../model/markertData.js')
         let areadyBuy = areadyBuy1.findOne({id:"1"}).exec();
         console.log("we are selling eth")

         if(areadyBuy.ethOnBuy == true){

            console.log("we are selling eth with bar")
            /// we go put current cryto price here
            areadyBuy.ethOnBuy = false;
            await depo.orderCrypto("ETH/USDT",'sell',areadyBuy.ethSell,await mark.getCrypoPrice("ETH/USDT",areadyBuy.ethSell));
            await depo.payPercent(depo.clientGain(areadyBuy.ethBuy,await mark.getCrypoPrice("ETH/USDT",areadyBuy.ethSell)),"eth");
   
         //    await fs.writeFile(
         //       path.join(__dirname,'..','model','markertData.json'),
         //       JSON.stringify(areadyBuy)
         //   );
          areadyBuy.save();
         }
       

         }

            

        

//ETH/USDT
//BTC/USDT

}

}

}



const check_Market =  ( )=>{


   const jobs = shedule.scheduleJob('*/5 * * * *', async ()=>{
      console.log('runining')
           const mark = connect_Markert();
          const depo = deopist();
          await depo.credit_user(); // credit users from thier deposit on wallet
          await mark.connect_btc();
          await mark.connect_eth();
         // await depo.handler();
   }
   )

   


}

const time_Call = async ()=>{
   
   check_Market();
   
}

module.exports = time_Call;
