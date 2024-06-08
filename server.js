const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const condb = require('./config/condb.js');
const mongoose = require('mongoose')
const {logger} = require('./middleware/logEvent')
const errorHandler = require('./middleware/errorhandler')
require('dotenv').config();
const express = require('express');
const verifyJwt = require('./middleware/verify')
const app = express();
const cookieParser = require('cookie-parser')
const handleRefresh = require('./middleware/refresh')
const PORT = process.env.PORT || 3500;
const credentials = require('./middleware/credentials')

const time_Call =  require('./trade/connect.js');


condb()


app.use(logger);
app.use(credentials)
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.use('/ping',require('./routes/api/ping'))
app.use('/register',require('./routes/api/newUser'))
app.use('/forget',require('./routes/api/forgetPass'))
app.use('/comfarm',require('./routes/api/comfarm'))
app.use('/login',require('./routes/api/login'))
app.use('/logout',require('./routes/api/logout'))
app.use('/fetchdata',require('./routes/api/fetchdata'))
app.use(handleRefresh);

app.use(verifyJwt)
app.use('/userwithdraw',require('./routes/api/userwithdraw'))
app.use('/deleteuser',require('./routes/api/deleteUsers'))
app.use('/getuserprofile',require('./routes/api/userProfile'))
app.use('/getuseraccount',require('./routes/api/userAccount'))
app.use('/usergain',require('./routes/api/getGain'))
app.use('/userresetpassword',require('./routes/api/resetPassword'))
app.use('/updateaddress',require('./routes/api/updateadress'))


app.use(errorHandler);

//app.listen(PORT,()=>console.log(`running on port ${PORT}`))

mongoose.connection.once('open',()=>{
    console.log("conncted to mongoDb");
   
    app.listen(PORT,()=>console.log(`running on port ${PORT}`))
});

