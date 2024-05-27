const {logEvent} = require("./logEvent");

const errorMessage = (err)=>{
    logEvent(`wallet ID:  ${err}`,'marketLog.txt')
  
}

module.exports = errorMessage;