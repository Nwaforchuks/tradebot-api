const mongoose = require('mongoose');
const time_Call =  require('../trade/connect.js');
require('dotenv').config();
const get_Data =  ()=>{
    console.log("hello world");
    time_Call();
   

}
get_Data();
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.userdb,{
            autoIndex:true
        });
    }catch(err){
        console.error(err)
    }
}

module.exports = connectDb;