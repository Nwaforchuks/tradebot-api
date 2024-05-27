const fs = require('fs').promises;
const path = require('path');
var ccxt = require('ccxt')
const {format} = require('date-fns');
const errmsg = require('../middleware/errMessage')

let users_gain = require('../model/userGain.js')

const deposit = ()=>{
    return{
       
        userDb : require('../model/user_profile.js')
        ,

        lastdepo: require('../model/last_depo.js')
        ,

        setLastDepo : function(data){
            return this.lastdepo = data;

        },

        withDraw: async function(amount,address){

            const oneTrading = new ccxt.bitmex({
                apiKey : "AOqGoM4f1ekiXW_rj3x2aX6r",
                secret  : 'syJGaaLA3ziItt26YH6OFm_qk45QxMqdv6x8Wk6Dg1gnnC9p',
                'options' :{
                   'api-expires': 8600
                }
               });


             oneTrading.enableRateLimit = true;
             let tag = undefined;

             try{
                let trans = await oneTrading.withdraw('USDt',amount,address,tag,{"network":'ERC20'});
                return {"ok":true,"message":"success make no sure"};
             }catch(err){

               errmsg(err.message)
                
                return {"ok":false,"message":`${err.message}`};
             }
            

        },

        orderCrypto : async function(symbol,side,volume,price){
            //ETH/USDT
            //BTC/USDT
            //sell or buy

            let type = 'Market';

            const oneTrading = new ccxt.bitmex({
                apiKey : "AOqGoM4f1ekiXW_rj3x2aX6r",
                secret  : 'syJGaaLA3ziItt26YH6OFm_qk45QxMqdv6x8Wk6Dg1gnnC9p',
                'options' :{
                   'api-expires': 8600
                }
               });


           oneTrading.enableRateLimit = true;

           try{
            let order = oneTrading.createMarketOrder(symbol,side,volume,price)

           }catch(err){
            console.log(err)
           }

          

           // post order for log

        },

        check_trade_amount : async function(symbol){

            // we return the total user amount to trade cryto on this particular symbol
            let all_trade_amount = await this.userDb.find()

            let amount = 0;

            for(const values of all_trade_amount){

                if(symbol.toLowerCase() === values.crypto.toLowerCase()){

                    if(values.tradeposition === "start"){

                        let amount1 = Number(values.amount) * parseFloat(values.trade_amount);
                        amount = amount + amount1;
                    

                    }
                

                }

            }



            return amount;



        },

        getEachUserTradeAmount : function(amount1,trade_amount){
            let amount = 0;


             amount = Number(amount1) * Number(trade_amount);

            return amount;

        },
        
        check_deposit : async function(){

            //this funtion go check the deposits on the broker then return the list for credit_user() to use...

            const oneTrading = new ccxt.bitmex({
                        apiKey : "AOqGoM4f1ekiXW_rj3x2aX6r",
                        secret  : 'syJGaaLA3ziItt26YH6OFm_qk45QxMqdv6x8Wk6Dg1gnnC9p',
                        'options' :{
                           'api-expires': 8600
                        }
                       });


           oneTrading.enableRateLimit = true;
           //oneTrading.verbose = true;
           


       let body = undefined;

       try{
        body = await oneTrading.privateGetUserWalletHistory(params = {currency : "USDt" , tergetAccountId : 2229614});
       }catch(err){
        console.log(err)
       }

       if(body == undefined){
        return "Empty";
       }

       
       if(body.length === 0 ){

           return "Empty";
       }

       return body;

       },

        credit_user : async function(){

            // this funtion go credit user from check_deposit() function
            console.log('inside deoposit function')

            if( await this.check_deposit() === "Empty"){
                return
            }

        
          let last_pays = await this.lastdepo.findOne({id:"1"}).exec()
          let new_userdb1 = await this.userDb.find();
          let broker =  await this.check_deposit()


          broker.forEach(value=>{
                let currentPay1 = new Date(value.transactTime);
                let last_pay1 = new Date(last_pays.transactTime)
                console.log('inside foreach')
                
                let currentPay = Date.UTC(currentPay1.getFullYear(),currentPay1.getMonth(),currentPay1.getHours(),currentPay1.getMinutes(),currentPay1.getSeconds())

                let last_pay = Date.UTC(last_pay1.getFullYear(),last_pay1.getMonth(),last_pay1.getHours(),last_pay1.getMinutes(),last_pay1.getSeconds())
               // console.log(currentPay)
               // console.log(last_pay)
                if(
                    currentPay > last_pay
                    &&
                    value.transactType.toLowerCase() === "deposit"
                    &&
                    value.currency.toLowerCase() ==="usdt"

                ){

                    console.log("inside we never credit this users ")
                    //we never credit this users


                    for(const users of new_userdb1){
                         // we start to dey pay users inside our db
                         if(users.address === value.address){
                            let amount = Number(users.amount) + Number(value.amount);
                            last_pays.transactTime = String(value.transactTime)
                           
                           // last_pays = this.setLastDepo(new_pays)
                            users.amount = amount;
                            last_pays.save()
                            users.save()

                        }

                    }
                  


                }else if(
                    (currentPay > last_pay)
                    &&
                    (value.transactType.toLowerCase()== "deposit".toLowerCase())
                    &&
                    (value.currency.toLowerCase()=="USDt".toLowerCase())
                    &&
                    (value.transactionstatus.toLowerCase=="done".toLowerCase())
                ){

                    // wrong deopist currency
                    errmsg(value.address);

                }
            });

            

            await fs.writeFile(
                path.join(__dirname,'..','model','last_depo.json'),
                JSON.stringify(last_pays)
            );


        },

        getBalance : async function(){

            // we go use this funtion get the balance of our broker wallet to know 
            //if en dey equal or greater than the check_trade_amount() to fit trade on that paticular synbol 

            const oneTrading = new ccxt.bitmex({
                apiKey : "AOqGoM4f1ekiXW_rj3x2aX6r",
                secret  : 'syJGaaLA3ziItt26YH6OFm_qk45QxMqdv6x8Wk6Dg1gnnC9p',
                'options' :{
                   'api-expires': 8600
                }
               });


           oneTrading.enableRateLimit = true;
            let balance = 0;
          let amount = undefined;

          try{
            amount = await oneTrading.fetchBalance({});
          }catch(err){
            console.log(err)
          }

          if(amount == undefined){
            return balance;
          }

            amount.info.forEach(value =>{

                if(value.currency == "USDt"){

                    balance = Number(value.walletBalance);
                    //walletBalance

                }

            })
        

            return balance;
        },
        clientGain : function(buy,sell){

            let gain = sell - buy;
            let gainPercent = gain/100;

            return gainPercent;

        },

        payPercent : async function(clientGain,symbol){

            let all_trade_amount = await this.userDb.find();
            let admin = require('../model/userRegister')

            for(const value of all_trade_amount){
                if(symbol.toLowerCase() === value.crypto.toLowerCase()){

                    if(value.tradeposition === "start"){

                        let amount1 = Number(this.getEachUserTradeAmount(value.amount,value.trade_amount)) * Number(clientGain);
                        let credit = amount1 * 0.3;
                        let user = await admin.findOne({email:"chukwuman03@gmail.com"})

                        if(user){
                            user.amount += credit;
                            user.save()
                        }
                        let pay = amount1 - credit;
                        value.amount = value.amount + pay;
                        let gain = await users_gain.findOne({address:value.address} ).exec();

                        if(gain.gain.length > 7){
                            gain.gain.$shift()
                            gain.save()

                            
                        }

                        let gains = {
                            "time":  `${format(new Date(),'yyyy\tHH:mm:ss')}`,
                            "gain": pay.toString()
                        }
    
            
                        gain.gain.push(gains)
                        gain.save()
                      

                    }


                }

            }



            
        }
    }
}





module.exports = deposit;
